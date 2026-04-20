import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Key, Shield, Zap, ChevronLeft, CheckCircle, AlertCircle, Trash2, Plus } from 'lucide-react';
import { useCredits } from '../contexts/CreditsContext';

export function ApiKeysManagement({ onBack }: { onBack: () => void }) {
  const { apiKeys, setApiKey, setUseCustomKeys } = useCredits();
  const [showKeys, setShowKeys] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [tempKeyValue, setTempKeyValue] = useState('');

  // Force custom keys to true since we removed platform credits
  useEffect(() => {
    setUseCustomKeys(true);
  }, [setUseCustomKeys]);

  const connectedCount = Object.values(apiKeys).filter(k => k.trim().length > 0).length;

  const handleDelete = (keyName: keyof typeof apiKeys) => {
    if (window.confirm('Are you sure you want to delete this API key?')) {
      setApiKey(keyName, '');
    }
  };

  const handleSave = (keyName: keyof typeof apiKeys) => {
    setApiKey(keyName, tempKeyValue);
    setEditingKey(null);
    setTempKeyValue('');
  };

  const startEdit = (keyName: keyof typeof apiKeys) => {
    setTempKeyValue(apiKeys[keyName]);
    setEditingKey(keyName);
  };

  const providers = [
    { id: 'gemini', name: 'Google Gemini API Key', placeholder: 'AIzaSy...' },
    { id: 'upai', name: 'UP AI Key (Image & Video)', placeholder: 'up_...' },
    { id: 'openai', name: 'OpenAI API Key (Optional)', placeholder: 'sk-...' },
  ] as const;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto space-y-8 p-4 sm:p-6"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Profile
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
              <Key className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Bring Your Own Key (BYOK)</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400">
            Use your own API keys. You will be billed directly by the API providers.
          </p>
          
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Connected APIs:</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs font-bold rounded-full">
              {connectedCount} / {providers.length}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-slate-900 dark:text-white">Your API Connections</h4>
            <button 
              onClick={() => setShowKeys(!showKeys)}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {showKeys ? 'Hide Keys' : 'Show Keys'}
            </button>
          </div>

          <div className="space-y-4">
            {providers.map((provider) => {
              const isConnected = apiKeys[provider.id as keyof typeof apiKeys].trim().length > 0;
              const isEditing = editingKey === provider.id;

              return (
                <div key={provider.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-slate-900 dark:text-white">{provider.name}</h5>
                      {isConnected && !isEditing && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                          Connected
                        </span>
                      )}
                    </div>
                    
                    {isEditing ? (
                      <div className="flex items-center gap-2 mt-2">
                        <input 
                          type={showKeys ? "text" : "password"}
                          value={tempKeyValue}
                          onChange={(e) => setTempKeyValue(e.target.value)}
                          placeholder={provider.placeholder}
                          className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:text-white text-sm"
                        />
                        <button 
                          onClick={() => handleSave(provider.id as keyof typeof apiKeys)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Save
                        </button>
                        <button 
                          onClick={() => setEditingKey(null)}
                          className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs sm:max-w-sm">
                        {isConnected ? (
                          showKeys ? apiKeys[provider.id as keyof typeof apiKeys] : '••••••••••••••••••••••••••••'
                        ) : (
                          'Not connected'
                        )}
                      </div>
                    )}
                  </div>
                  
                  {!isEditing && (
                    <div className="flex items-center gap-2">
                      {isConnected ? (
                        <>
                          <button 
                            onClick={() => startEdit(provider.id as keyof typeof apiKeys)}
                            className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
                            title="Edit Key"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(provider.id as keyof typeof apiKeys)}
                            className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                            title="Delete Key"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => startEdit(provider.id as keyof typeof apiKeys)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add Key
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start gap-3 mt-6">
            <Shield className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Storage & Security
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Your API keys are stored securely in your browser's local storage. They are never sent to our servers and are only communicated directly to the respective API providers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
