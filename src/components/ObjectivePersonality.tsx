import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Languages, Star, Shield, AlertTriangle, User, Users, Baby, Shirt, Heart, Mic, Eye, MapPin, Smile, Utensils, Scissors, Laugh, Ear } from 'lucide-react';

interface Adjective {
  word: string;
  telugu: string;
  category: 'positive' | 'neutral' | 'negative';
}

const MAN_PERSONALITY: Adjective[] = [
  { word: 'Handsome', telugu: 'అందమైన', category: 'positive' },
  { word: 'Clean cut', telugu: 'శుభ్రమైన', category: 'positive' },
  { word: 'Striking', telugu: 'కొట్టొచ్చినట్టు', category: 'positive' },
  { word: 'Arresting', telugu: 'కట్టి పడేసే', category: 'positive' },
  { word: 'Appealing', telugu: 'ఆకర్షణీయమైన', category: 'positive' },
  { word: 'Sculptured', telugu: 'శిల్పం చెక్కినట్లు', category: 'positive' },
  { word: 'Well built', telugu: 'చక్కని ఆకృతికలిగిన', category: 'positive' },
  { word: 'Rugged', telugu: 'దృఢమైన', category: 'positive' },
  { word: 'Ambitious', telugu: 'దృఢ చిత్తము కలిగిన', category: 'positive' },
  { word: 'Rough', telugu: 'సౌమ్యతలేని', category: 'neutral' },
  { word: 'Excellent', telugu: 'అద్భుతమైన', category: 'positive' },
  { word: 'Silent', telugu: 'మౌనంగా', category: 'neutral' },
  { word: 'Inviting', telugu: 'ఆకర్షణీయమైన', category: 'positive' },
  { word: 'Engaging', telugu: 'మనసుకు నచ్చే', category: 'positive' },
  { word: 'Innocent', telugu: 'అమాయక', category: 'positive' },
  { word: 'Fearless', telugu: 'భయంలేని', category: 'positive' },
  { word: 'Likable', telugu: 'ఇష్టపడే', category: 'positive' },
  { word: 'Selective', telugu: 'ప్రత్యేకమైన', category: 'neutral' },
  { word: 'Brave', telugu: 'ధైర్యమైన', category: 'positive' },
  { word: 'Catty', telugu: 'పిరికి', category: 'negative' },
  { word: 'Cheeky', telugu: 'నిండైన చెంపలు కలిగిన', category: 'neutral' },
  { word: 'Bad tempered', telugu: 'చెడ్డ స్వభావం కల', category: 'negative' },
  { word: 'Big headed', telugu: 'తలబిరుసు', category: 'negative' },
  { word: 'Arrogant', telugu: 'గర్వంకలిగిన', category: 'negative' },
  { word: 'Bossy', telugu: 'పెత్తనం చలాయించే', category: 'negative' },
];

const WOMAN_PERSONALITY: Adjective[] = [
  { word: 'Gorgeous', telugu: 'అందమైన', category: 'positive' },
  { word: 'Glamorous', telugu: 'ఆకర్షణీయమైన', category: 'positive' },
  { word: 'Amazing', telugu: 'అద్భుతమైన', category: 'positive' },
  { word: 'Awesome', telugu: 'అద్భుతమైన', category: 'positive' },
  { word: 'Effeminate', telugu: 'స్త్రీపురుష', category: 'neutral' },
  { word: 'Smart-attractive', telugu: 'ఆకర్షణీయమైన', category: 'positive' },
  { word: 'Homely', telugu: 'సాధారణమైన', category: 'neutral' },
  { word: 'Beautiful', telugu: 'అందమైన', category: 'positive' },
  { word: 'Melting', telugu: 'కరిగించే', category: 'positive' },
  { word: 'Alluring', telugu: 'ఆకర్షణీయమైన', category: 'positive' },
  { word: 'Dazzling', telugu: 'మిరుమిట్లు గొలిపే', category: 'positive' },
  { word: 'Gracious', telugu: 'దయగల', category: 'positive' },
  { word: 'Seductive', telugu: 'దురుద్దేశం కలిగించే', category: 'neutral' },
  { word: 'Romantic-charming', telugu: 'శృంగార-మనోహరమైన', category: 'positive' },
  { word: 'Cherubic', telugu: 'పసితనం', category: 'positive' },
  { word: 'Haunting', telugu: 'వెంటాడే', category: 'neutral' },
  { word: 'Irresistible', telugu: 'నిగ్రహించుకోలేని', category: 'positive' },
  { word: 'Staggering', telugu: 'దిమ్మెతిరిగే', category: 'positive' },
  { word: 'Bewitching', telugu: 'మంత్రముగ్ధులను చేసే', category: 'positive' },
  { word: 'Curvaceous', telugu: 'ఒంపులు తిరిగిన', category: 'positive' },
  { word: 'Mesmerizing', telugu: 'మంత్రముగ్ధులను చేసే', category: 'positive' },
  { word: 'Drop-dead', telugu: 'అత్యంత అందమైన', category: 'positive' },
  { word: 'Angelic', telugu: 'దేవదూతలాంటి', category: 'positive' },
  { word: 'Comely', telugu: 'అందమైన', category: 'positive' },
  { word: 'Radiant', telugu: 'ప్రకాశించే', category: 'positive' },
  { word: 'Ravishing', telugu: 'విపరీతమైన అందమైన', category: 'positive' },
  { word: 'Stunning', telugu: 'అద్భుతమైన', category: 'positive' },
  { word: 'Elegant', telugu: 'సొగసైన', category: 'positive' },
];

const CHILD_PERSONALITY: Adjective[] = [
  { word: 'Adorable', telugu: 'పూజ్యమైన', category: 'positive' },
  { word: 'Lovely', telugu: 'సుందరమైన', category: 'positive' },
  { word: 'Bubbly', telugu: 'బబ్లీ', category: 'positive' },
  { word: 'Bonny', telugu: 'ముద్దుగా ఉన్న', category: 'positive' },
  { word: 'Cute', telugu: 'అందమైన', category: 'positive' },
  { word: 'Darling', telugu: 'ప్రియమైన', category: 'positive' },
  { word: 'Pretty', telugu: 'చక్కని', category: 'positive' },
  { word: 'Dainty', telugu: 'అందమైన', category: 'positive' },
  { word: 'Cuddly', telugu: 'ముద్దుగా', category: 'positive' },
  { word: 'Loveable', telugu: 'ప్రేమించదగినది', category: 'positive' },
  { word: 'Sweet', telugu: 'చూడ చక్కని', category: 'positive' },
  { word: 'Little', telugu: 'చిన్నని', category: 'neutral' },
  { word: 'Precious', telugu: 'విలువైన', category: 'positive' },
  { word: 'Dashing', telugu: 'డాషింగ్', category: 'positive' },
  { word: 'Teensy', telugu: 'యుక్త', category: 'neutral' },
];

const DRESS_ADJECTIVES: Adjective[] = [
  { word: 'Elegant', telugu: 'సొగసైన', category: 'positive' },
  { word: 'Glamorous', telugu: 'ఆకర్షణీయమైన', category: 'positive' },
  { word: 'Gorgeous', telugu: 'బ్రహ్మాండమైన', category: 'positive' },
  { word: 'Presentable', telugu: 'ప్రదర్శించదగిన', category: 'positive' },
  { word: 'Colorful', telugu: 'రంగురంగుల', category: 'positive' },
  { word: 'Casual wear', telugu: 'సాధారణ దుస్తులు', category: 'neutral' },
  { word: 'Formal wear', telugu: 'అధికారిక దుస్తులు', category: 'neutral' },
  { word: 'Expensive clothes', telugu: 'ఖరీదైన బట్టలు', category: 'neutral' },
  { word: 'Cheap clothes', telugu: 'చౌక బట్టలు', category: 'neutral' },
  { word: 'Shabby clothes', telugu: 'చిరిగిన బట్టలు', category: 'negative' },
  { word: 'Handmade clothes', telugu: 'చేతితో తయారు చేసే', category: 'positive' },
  { word: 'Designer clothes', telugu: 'డిజైనర్ దుస్తులు', category: 'positive' },
  { word: 'Readymade clothes', telugu: 'రెడీమేడ్ బట్టలు', category: 'neutral' },
  { word: 'Cotton clothes', telugu: 'పత్తి బట్టలు', category: 'neutral' },
  { word: 'Linen clothes', telugu: 'నార బట్టలు', category: 'neutral' },
  { word: 'Silk clothes', telugu: 'పట్టు బట్టలు', category: 'positive' },
  { word: 'Synthetic clothes', telugu: 'సింథటిక్ బట్టలు', category: 'neutral' },
  { word: 'Nylon clothes', telugu: 'నైలాన్ బట్టలు', category: 'neutral' },
  { word: 'Polyester clothes', telugu: 'పాలిస్టర్ బట్టలు', category: 'neutral' },
  { word: 'Denim clothes', telugu: 'డెనిమ్ బట్టలు', category: 'neutral' },
  { word: 'Leather clothes', telugu: 'తోలు బట్టలు', category: 'neutral' },
];

const CHARACTER_ADJECTIVES: Adjective[] = [
  { word: 'Active', telugu: 'చురుకైన', category: 'positive' },
  { word: 'Aggressive', telugu: 'దూకుడు స్వభావం కలిగిన', category: 'negative' },
  { word: 'Ambitious', telugu: 'ఆశావాహ దృక్పథం కలిగిన', category: 'positive' },
  { word: 'Arrogant', telugu: 'గర్వం కలిగిన', category: 'negative' },
  { word: 'Assertive', telugu: 'దృఢమైన', category: 'positive' },
  { word: 'Creative', telugu: 'సృజనాత్మక', category: 'positive' },
  { word: 'Pleasant', telugu: 'ఆహ్లాదకరమైన', category: 'positive' },
  { word: 'Good tempered', telugu: 'మంచి స్వభావం కల', category: 'positive' },
  { word: 'Easy going', telugu: 'పట్టించుకోని', category: 'positive' },
  { word: 'Friendly', telugu: 'స్నేహపూర్వక', category: 'positive' },
  { word: 'Independent', telugu: 'స్వతంత్రమైన', category: 'positive' },
  { word: 'Matured', telugu: 'పరిపక్వమైన', category: 'positive' },
  { word: 'Reliable', telugu: 'విశ్వసనీయమైన', category: 'positive' },
  { word: 'Honest', telugu: 'నిజాయితీ', category: 'positive' },
  { word: 'Hard-working', telugu: 'కష్టపడి పనిచేసే', category: 'positive' },
  { word: 'Energetic', telugu: 'శక్తివంతమైన', category: 'positive' },
  { word: 'Lazy', telugu: 'సోమరితనం కలిగిన', category: 'negative' },
  { word: 'Organized', telugu: 'నిర్వాహక', category: 'positive' },
  { word: 'Self confident', telugu: 'ఆత్మవిశ్వాసం కలిగిన', category: 'positive' },
  { word: 'Generous', telugu: 'ఉదారమైన', category: 'positive' },
];

const LIPS_ADJECTIVES: Adjective[] = [
  { word: 'Flat lips', telugu: 'చదునైన పెదవులు', category: 'neutral' },
  { word: 'Uneven lips', telugu: 'వంగిపోయిన పెదవులు', category: 'neutral' },
  { word: 'Droopy lips', telugu: 'ముసిముసిగా నవ్వుతున్న పెదవులు', category: 'positive' },
  { word: 'Thick lips', telugu: 'మందపాటి పెదవులు', category: 'neutral' },
  { word: 'Thin lips', telugu: 'సన్నని పెదవులు', category: 'neutral' },
  { word: 'Wide lips', telugu: 'విశాలమైన పెదవులు', category: 'neutral' },
  { word: 'Full lips', telugu: 'నిండు పెదవులు', category: 'positive' },
  { word: 'Round lips', telugu: 'గుండ్రటి పెదవులు', category: 'neutral' },
];

const VOICE_ADJECTIVES: Adjective[] = [
  { word: 'Sweet', telugu: 'తీయని', category: 'positive' },
  { word: 'Husky', telugu: 'ముక్కులిగిన', category: 'neutral' },
  { word: 'Melodious', telugu: 'మధురమైన', category: 'positive' },
  { word: 'Mellifluous', telugu: 'మధురమైన', category: 'positive' },
  { word: 'Appealing', telugu: 'వివ సొప్పిన', category: 'positive' },
  { word: 'Breathy', telugu: 'నెమ్మదైన', category: 'neutral' },
  { word: 'Croaky', telugu: 'అలసి పోయిన స్వరము', category: 'neutral' },
  { word: 'Fruity', telugu: 'లోతైన', category: 'neutral' },
  { word: 'Honeyed', telugu: 'తీయని', category: 'positive' },
  { word: 'Silvery', telugu: 'తలుక్కమనే', category: 'positive' },
  { word: 'Sing song', telugu: 'సుస్వరమైన', category: 'positive' },
  { word: 'Smoky', telugu: 'రసిక', category: 'neutral' },
];

const EYES_ADJECTIVES: Adjective[] = [
  { word: 'Dancing eyes', telugu: 'నృత్యం ఆడే కళ్ళు', category: 'positive' },
  { word: 'Flashing eyes', telugu: 'మెరుస్తున్న కళ్ళు', category: 'positive' },
  { word: 'Glittering eyes', telugu: 'మెరుస్తున్న కళ్ళు', category: 'positive' },
  { word: 'Sparkling eyes', telugu: 'మెరిసే కళ్ళు', category: 'positive' },
  { word: 'Twinkling eyes', telugu: 'మెరిసే కళ్ళు', category: 'positive' },
  { word: 'Dark eyes', telugu: 'నల్ల కళ్ళు', category: 'neutral' },
  { word: 'Brown eyes', telugu: 'గోధుమ కళ్ళు', category: 'neutral' },
  { word: 'Blue eyes', telugu: 'నీలి కళ్ళు', category: 'neutral' },
  { word: 'Light blue eyes', telugu: 'లేత నీలం కళ్ళు', category: 'neutral' },
  { word: 'Bright eyes', telugu: 'ప్రకాశవంతమైన కళ్ళు', category: 'positive' },
  { word: 'Expressive eyes', telugu: 'వ్యక్తీకరణ కళ్ళు', category: 'positive' },
  { word: 'Long lashed eyes', telugu: 'పొడవైన కనురెప్పలు', category: 'positive' },
];

const PLACE_ADJECTIVES: Adjective[] = [
  { word: 'Lovely', telugu: 'సుందరమైన', category: 'positive' },
  { word: 'Magnificent', telugu: 'అద్భుతమైన', category: 'positive' },
  { word: 'Endearing', telugu: 'మనోహరమైన', category: 'positive' },
  { word: 'Enchanting', telugu: 'మంత్రముగ్ధులను చేసే', category: 'positive' },
  { word: 'Eye catching', telugu: 'కంటికి ఇంపుగా', category: 'positive' },
  { word: 'Picturesque', telugu: 'సుందరమైన', category: 'positive' },
  { word: 'Amazing', telugu: 'అద్భుతమైన', category: 'positive' },
  { word: 'Beautiful', telugu: 'అందమైన', category: 'positive' },
  { word: 'Modern', telugu: 'ఆధునిక', category: 'neutral' },
  { word: 'Natural', telugu: 'సహజ', category: 'positive' },
  { word: 'Tranquil', telugu: 'ప్రశాంతమైన', category: 'positive' },
  { word: 'Romantic', telugu: 'శృంగార', category: 'positive' },
  { word: 'Panoramic', telugu: 'విశాలమైన', category: 'positive' },
];

const EXPRESSION_ADJECTIVES: Adjective[] = [
  { word: 'Absent', telugu: 'పరధ్యానంలో ఉన్న', category: 'neutral' },
  { word: 'Appealing', telugu: 'ఆకర్షించే', category: 'positive' },
  { word: 'Beatific', telugu: 'అందమైన', category: 'positive' },
  { word: 'Curious', telugu: 'ఆసక్తి కలిగిన', category: 'positive' },
  { word: 'Dreamy', telugu: 'ఊహలలో', category: 'positive' },
  { word: 'Meaningful', telugu: 'అర్థవంతమైన', category: 'positive' },
  { word: 'Mischievous', telugu: 'కోంటె', category: 'neutral' },
  { word: 'Radiant', telugu: 'ప్రకాశించే', category: 'positive' },
  { word: 'Smiley', telugu: 'చిరునవ్వుతో ఉన్న', category: 'positive' },
  { word: 'Thoughtful', telugu: 'ఆలోచనతో కూడిన', category: 'positive' },
  { word: 'Worried', telugu: 'ఆందోళనతో కూడిన', category: 'negative' },
];

const FOOD_ADJECTIVES: Adjective[] = [
  { word: 'Deep fried', telugu: 'బాగా వేగిన', category: 'neutral' },
  { word: 'Juicy', telugu: 'రసముతో కూడిన', category: 'positive' },
  { word: 'Bitter', telugu: 'చేదుగా ఉన్న', category: 'neutral' },
  { word: 'Salty', telugu: 'ఉప్పగా ఉన్న', category: 'neutral' },
  { word: 'Tasteless', telugu: 'రుచిలేని', category: 'negative' },
  { word: 'Tempting', telugu: 'ఉరించే', category: 'positive' },
  { word: 'Tasty', telugu: 'రుచికరమైన', category: 'positive' },
  { word: 'Delicious', telugu: 'రుచికరమైన', category: 'positive' },
  { word: 'Yummy', telugu: 'నోరూరించే', category: 'positive' },
];

const HAIR_ADJECTIVES: Adjective[] = [
  { word: 'Short hair', telugu: 'చిన్న జుట్టు', category: 'neutral' },
  { word: 'Straight hair', telugu: 'నేరుగా జుట్టు', category: 'neutral' },
  { word: 'Wavy hair', telugu: 'అల వంటి జుట్టు', category: 'neutral' },
  { word: 'Long hair', telugu: 'పొడవైన జుట్టు', category: 'neutral' },
  { word: 'Silky hair', telugu: 'సిల్కీ జుట్టు', category: 'positive' },
  { word: 'Curly hair', telugu: 'గిరజాల జుట్టు', category: 'neutral' },
  { word: 'Smooth hair', telugu: 'మృదువైన జుట్టు', category: 'positive' },
  { word: 'Shiny hair', telugu: 'మెరిసే జుట్టు', category: 'positive' },
  { word: 'Neatly combed hair', telugu: 'చక్కగా దువ్వుకున్న జుట్టు', category: 'positive' },
];

const SMILE_ADJECTIVES: Adjective[] = [
  { word: 'Sincere', telugu: 'నిష్కపటమైన', category: 'positive' },
  { word: 'Sweet', telugu: 'తీయని', category: 'positive' },
  { word: 'Welcoming', telugu: 'ఆహ్వానించే', category: 'positive' },
  { word: 'Gracious', telugu: 'దయగల', category: 'positive' },
  { word: 'Dazzling', telugu: 'మిరుమిట్లు గొలిపే', category: 'positive' },
  { word: 'Lovely', telugu: 'సుందరమైన', category: 'positive' },
  { word: 'Loving', telugu: 'ప్రేమించే', category: 'positive' },
  { word: 'Beautiful', telugu: 'అందమైన', category: 'positive' },
  { word: 'Beaming', telugu: 'ప్రకాశించే', category: 'positive' },
  { word: 'Glowing', telugu: 'ప్రకాశించే', category: 'positive' },
];

const EARS_NOSE_ADJECTIVES: Adjective[] = [
  { word: 'Nice nose', telugu: 'చక్కని ముక్కు', category: 'positive' },
  { word: 'Small nose', telugu: 'చిన్న ముక్కు', category: 'neutral' },
  { word: 'Big nose', telugu: 'పెద్ద ముక్కు', category: 'neutral' },
  { word: 'Flat nose', telugu: 'చదునైన ముక్కు', category: 'neutral' },
  { word: 'Thin nose', telugu: 'సన్నని ముక్కు', category: 'neutral' },
  { word: 'Thick nose', telugu: 'మందపాటి ముక్కు', category: 'neutral' },
  { word: 'Roman nose', telugu: 'రోమన్ ముక్కు', category: 'neutral' },
  { word: 'Delicate nose', telugu: 'సున్నితమైన ముక్కు', category: 'positive' },
];

const SKIN_ADJECTIVES: Adjective[] = [
  { word: 'Blooming', telugu: 'వికసించేది', category: 'positive' },
  { word: 'Clear', telugu: 'స్వచ్చ్లమైన', category: 'positive' },
  { word: 'Glowing', telugu: 'ప్రకాశించే', category: 'positive' },
  { word: 'Fair', telugu: 'చక్కనైన', category: 'positive' },
  { word: 'Rosy', telugu: 'గులాబీ రంగు', category: 'positive' },
  { word: 'Ruddy', telugu: 'ఎరుపుెక్కిన', category: 'neutral' },
  { word: 'Tanned', telugu: 'జలృ పట్టిన', category: 'neutral' },
];

export function ObjectivePersonality({ section }: { section?: string }) {
  const [showTelugu, setShowTelugu] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'positive': return <Star className="w-4 h-4 text-emerald-500" />;
      case 'negative': return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      default: return <Shield className="w-4 h-4 text-slate-400" />;
    }
  };

  const Section = ({ title, icon, data, image, accentColor }: { 
    title: string, 
    icon: React.ReactNode, 
    data: Adjective[], 
    image: string,
    accentColor: string
  }) => (
    <div className="mb-0">
      <div className="flex items-center gap-4 mb-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
        <div className={`p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-${accentColor}-100 dark:border-${accentColor}-800`}>
          {icon}
        </div>
        <div>
          <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h4>
          <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Trait Categories</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-8">
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 aspect-[3/4]">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover shadow-inner"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {data.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.01 }}
              className={`group p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-${accentColor}-300 dark:hover:border-${accentColor}-500/50 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-between`}
            >
              <div className="flex flex-col">
                <span className={`text-base font-bold text-slate-800 dark:text-slate-200 group-hover:text-${accentColor}-600 dark:group-hover:text-${accentColor}-400 transition-colors`}>
                  {item.word}
                </span>
                {showTelugu && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] text-slate-400 font-bold leading-tight mt-0.5"
                  >
                    {item.telugu}
                  </motion.span>
                )}
              </div>
              <div className={`p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl group-hover:bg-${accentColor}-50 dark:group-hover:bg-${accentColor}-500/10 transition-colors`}>
                {getCategoryIcon(item.category)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (section) {
      case 'man':
        return <Section title="Personality: Man" icon={<User className="w-8 h-8 text-sky-500" />} data={MAN_PERSONALITY} image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800" accentColor="sky" />;
      case 'woman':
        return <Section title="Personality: Woman" icon={<Users className="w-8 h-8 text-rose-500" />} data={WOMAN_PERSONALITY} image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=800" accentColor="rose" />;
      case 'child':
        return <Section title="Personality: Child" icon={<Baby className="w-8 h-8 text-emerald-500" />} data={CHILD_PERSONALITY} image="https://images.unsplash.com/photo-1502086223501-7ea244b05ec6?auto=format&fit=crop&q=80&w=600&h=800" accentColor="emerald" />;
      case 'trait':
        return <Section title="Character Trait" icon={<Heart className="w-8 h-8 text-orange-500" />} data={CHARACTER_ADJECTIVES} image="https://picsum.photos/seed/character/600/800" accentColor="orange" />;
      case 'lips_voice':
        return <Section title="Lips & Voice" icon={<Mic className="w-8 h-8 text-violet-500" />} data={[...LIPS_ADJECTIVES, ...VOICE_ADJECTIVES]} image="https://picsum.photos/seed/voice_lips/600/800" accentColor="violet" />;
      case 'eyes':
        return <Section title="Eyes & Vision" icon={<Eye className="w-8 h-8 text-cyan-500" />} data={EYES_ADJECTIVES} image="https://picsum.photos/seed/eyes/600/800" accentColor="cyan" />;
      case 'place':
        return <Section title="Place & Atmosphere" icon={<MapPin className="w-8 h-8 text-lime-500" />} data={PLACE_ADJECTIVES} image="https://picsum.photos/seed/place/600/800" accentColor="lime" />;
      case 'expressions':
        return <Section title="Expressions" icon={<Smile className="w-8 h-8 text-amber-500" />} data={EXPRESSION_ADJECTIVES} image="https://picsum.photos/seed/expressions/600/800" accentColor="amber" />;
      case 'food':
        return <Section title="Food & Taste" icon={<Utensils className="w-8 h-8 text-red-500" />} data={FOOD_ADJECTIVES} image="https://picsum.photos/seed/food/600/800" accentColor="red" />;
      case 'hair':
        return <Section title="Hair Style" icon={<Scissors className="w-8 h-8 text-zinc-500" />} data={HAIR_ADJECTIVES} image="https://picsum.photos/seed/hair/600/800" accentColor="zinc" />;
      case 'smile':
        return <Section title="Smile & Joy" icon={<Laugh className="w-8 h-8 text-yellow-500" />} data={SMILE_ADJECTIVES} image="https://picsum.photos/seed/smile/600/800" accentColor="yellow" />;
      case 'ears_nose':
        return <Section title="Ears & Nose" icon={<Ear className="w-8 h-8 text-slate-500" />} data={EARS_NOSE_ADJECTIVES} image="https://picsum.photos/seed/ears_nose/600/800" accentColor="slate" />;
      case 'skin':
        return <Section title="Skin & Glow" icon={<Users className="w-8 h-8 text-teal-500" />} data={SKIN_ADJECTIVES} image="https://picsum.photos/seed/skin/600/800" accentColor="teal" />;
      case 'dress':
        return <Section title="Dress & Style" icon={<Shirt className="w-8 h-8 text-indigo-500" />} data={DRESS_ADJECTIVES} image="https://picsum.photos/seed/dress_style/600/800" accentColor="indigo" />;
      default:
        return (
          <div className="space-y-24">
            <Section title="Personality: Man" icon={<User className="w-8 h-8 text-sky-500" />} data={MAN_PERSONALITY} image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800" accentColor="sky" />
            <Section title="Personality: Woman" icon={<Users className="w-8 h-8 text-rose-500" />} data={WOMAN_PERSONALITY} image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=800" accentColor="rose" />
            <Section title="Personality: Child" icon={<Baby className="w-8 h-8 text-emerald-500" />} data={CHILD_PERSONALITY} image="https://images.unsplash.com/photo-1502086223501-7ea244b05ec6?auto=format&fit=crop&q=80&w=600&h=800" accentColor="emerald" />
            <Section title="Character Trait" icon={<Heart className="w-8 h-8 text-orange-500" />} data={CHARACTER_ADJECTIVES} image="https://picsum.photos/seed/character/600/800" accentColor="orange" />
            <Section title="Lips & Voice" icon={<Mic className="w-8 h-8 text-violet-500" />} data={[...LIPS_ADJECTIVES, ...VOICE_ADJECTIVES]} image="https://picsum.photos/seed/voice_lips/600/800" accentColor="violet" />
            <Section title="Eyes & Vision" icon={<Eye className="w-8 h-8 text-cyan-500" />} data={EYES_ADJECTIVES} image="https://picsum.photos/seed/eyes/600/800" accentColor="cyan" />
            <Section title="Place & Atmosphere" icon={<MapPin className="w-8 h-8 text-lime-500" />} data={PLACE_ADJECTIVES} image="https://picsum.photos/seed/place/600/800" accentColor="lime" />
            <Section title="Expressions" icon={<Smile className="w-8 h-8 text-amber-500" />} data={EXPRESSION_ADJECTIVES} image="https://picsum.photos/seed/expressions/600/800" accentColor="amber" />
            <Section title="Food & Taste" icon={<Utensils className="w-8 h-8 text-red-500" />} data={FOOD_ADJECTIVES} image="https://picsum.photos/seed/food/600/800" accentColor="red" />
            <Section title="Hair Style" icon={<Scissors className="w-8 h-8 text-zinc-500" />} data={HAIR_ADJECTIVES} image="https://picsum.photos/seed/hair/600/800" accentColor="zinc" />
            <Section title="Smile & Joy" icon={<Laugh className="w-8 h-8 text-yellow-500" />} data={SMILE_ADJECTIVES} image="https://picsum.photos/seed/smile/600/800" accentColor="yellow" />
            <Section title="Ears & Nose" icon={<Ear className="w-8 h-8 text-slate-500" />} data={EARS_NOSE_ADJECTIVES} image="https://picsum.photos/seed/ears_nose/600/800" accentColor="slate" />
            <Section title="Skin & Glow" icon={<Users className="w-8 h-8 text-teal-500" />} data={SKIN_ADJECTIVES} image="https://picsum.photos/seed/skin/600/800" accentColor="teal" />
            <Section title="Dress & Style" icon={<Shirt className="w-8 h-8 text-indigo-500" />} data={DRESS_ADJECTIVES} image="https://picsum.photos/seed/dress_style/600/800" accentColor="indigo" />
          </div>
        );
    }
  };

  return (
    <div className="mt-8 mb-12 max-w-7xl mx-auto px-4">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="w-20 h-1.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mb-8"></div>
        <h3 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 italic">
          Descriptive Adjectives
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg font-medium">
          A comprehensive guide to adjectives describing people, places, food, and expressions.
        </p>
        
        <button 
          onClick={() => setShowTelugu(!showTelugu)}
          className="mt-8 flex items-center gap-3 px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-black border border-slate-800 dark:border-slate-200 hover:scale-105 transition-all shadow-xl"
        >
          <Languages className="w-5 h-5" />
          {showTelugu ? 'Hide Telugu Meanings' : 'Show Telugu Meanings'}
        </button>
      </div>

      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
}
