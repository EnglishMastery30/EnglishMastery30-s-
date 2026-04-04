import { useState } from 'react';
import { MapPin, Search, Loader2, Navigation, ExternalLink, Map } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

export function NearbyClasses() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<string>('');
  const [places, setPlaces] = useState<any[]>([]);

  const findNearbyClasses = async () => {
    setLoading(true);
    setError(null);
    setResults('');
    setPlaces([]);

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Find the best spoken English course classes, language schools, or English tutors near my current location. Provide a helpful summary of the options.",
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: latitude,
                longitude: longitude
              }
            }
          }
        },
      });

      setResults(response.text || 'No results found.');
      
      // Extract places from grounding metadata
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const extractedPlaces = chunks
          .filter(chunk => chunk.maps)
          .map(chunk => chunk.maps);
        setPlaces(extractedPlaces);
      }

    } catch (err: any) {
      console.error('Error finding classes:', err);
      setError(err.message || 'Failed to find nearby classes. Please ensure location permissions are granted.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Nearby English Classes</h2>
            <p className="text-slate-600 dark:text-slate-400">Find spoken English courses and tutors in your local area using Google Maps.</p>
          </div>
        </div>

        {!results && !loading && (
          <div className="text-center py-12">
            <Map className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Discover Local Learning Centers</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              We'll use your current location to find the best rated spoken English classes and language schools near you.
            </p>
            <button
              onClick={findNearbyClasses}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors"
            >
              <Search className="w-5 h-5" />
              Find Classes Near Me
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center py-16">
            <Loader2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400 font-medium animate-pulse">
              Searching Google Maps for nearby classes...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl p-4 text-rose-700 dark:text-rose-400 text-sm flex items-start gap-3">
            <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Location Error</p>
              <p>{error}</p>
              <button 
                onClick={findNearbyClasses}
                className="mt-3 px-4 py-2 bg-rose-100 dark:bg-rose-500/20 hover:bg-rose-200 dark:hover:bg-rose-500/30 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {results && !loading && (
          <div className="space-y-8">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="markdown-body">
                <ReactMarkdown>{results}</ReactMarkdown>
              </div>
            </div>

            {places.length > 0 && (
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-500" />
                  Locations on Google Maps
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {places.map((place, index) => (
                    <a
                      key={index}
                      href={place.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-md bg-slate-50 dark:bg-slate-800/50 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                          {place.title || 'View Location'}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 shrink-0" />
                      </div>
                      <div className="mt-auto flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Navigation className="w-4 h-4" />
                        <span>Open in Google Maps</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-center pt-4">
              <button
                onClick={findNearbyClasses}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition-colors"
              >
                <Search className="w-5 h-5" />
                Search Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
