import { useState, useEffect } from 'react';
import { curriculum } from '../data/curriculum';

export interface VocabItem {
  word: string;
  pronunciation: string;
  meaning: string;
}

export interface VocabProgress extends VocabItem {
  lastReviewedDate: string | null;
  correctAnswersCount: number;
  nextReviewDate: string | null;
}

export function useVocabularySRS() {
  const [vocabList, setVocabList] = useState<VocabProgress[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('vocabProgress');
    if (stored) {
      setVocabList(JSON.parse(stored));
    } else {
      const initialList: VocabProgress[] = [];
      const seenWords = new Set<string>();
      
      curriculum.forEach(lesson => {
        if (lesson.vocabulary) {
          lesson.vocabulary.forEach(v => {
            if (!seenWords.has(v.word)) {
              seenWords.add(v.word);
              initialList.push({
                ...v,
                lastReviewedDate: null,
                correctAnswersCount: 0,
                nextReviewDate: null,
              });
            }
          });
        }
      });
      
      setVocabList(initialList);
      localStorage.setItem('vocabProgress', JSON.stringify(initialList));
    }
  }, []);

  const getWordsToReview = (limit: number = 10) => {
    const now = new Date().toISOString();
    
    return [...vocabList].sort((a, b) => {
      const aDue = a.nextReviewDate && a.nextReviewDate <= now;
      const bDue = b.nextReviewDate && b.nextReviewDate <= now;
      
      if (aDue && !bDue) return -1;
      if (!aDue && bDue) return 1;
      
      if (!a.lastReviewedDate && b.lastReviewedDate) return -1;
      if (a.lastReviewedDate && !b.lastReviewedDate) return 1;
      
      if (a.correctAnswersCount !== b.correctAnswersCount) {
        return a.correctAnswersCount - b.correctAnswersCount;
      }
      
      if (a.lastReviewedDate && b.lastReviewedDate) {
        return a.lastReviewedDate.localeCompare(b.lastReviewedDate);
      }
      
      return 0;
    }).slice(0, limit);
  };

  const markReview = (word: string, isCorrect: boolean) => {
    setVocabList(prev => {
      const updated = prev.map(item => {
        if (item.word === word) {
          const now = new Date();
          const newCorrectCount = isCorrect ? item.correctAnswersCount + 1 : Math.max(0, item.correctAnswersCount - 1);
          
          let daysToAdd = 0;
          if (newCorrectCount === 0) daysToAdd = 0;
          else if (newCorrectCount === 1) daysToAdd = 1;
          else if (newCorrectCount === 2) daysToAdd = 3;
          else if (newCorrectCount === 3) daysToAdd = 7;
          else daysToAdd = 14;
          
          const nextReview = new Date(now);
          if (daysToAdd === 0) {
            nextReview.setMinutes(nextReview.getMinutes() + 10);
          } else {
            nextReview.setDate(nextReview.getDate() + daysToAdd);
          }
          
          return {
            ...item,
            lastReviewedDate: now.toISOString(),
            correctAnswersCount: newCorrectCount,
            nextReviewDate: nextReview.toISOString()
          };
        }
        return item;
      });
      
      localStorage.setItem('vocabProgress', JSON.stringify(updated));
      return updated;
    });
  };

  return { vocabList, getWordsToReview, markReview };
}
