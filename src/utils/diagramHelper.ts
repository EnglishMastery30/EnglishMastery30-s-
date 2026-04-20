import { dayConfigs } from '../data/dayConfigs';
import { UniversalDiagramProps, DiagramGroup } from '../components/diagrams/UniversalDiagram';
import { UniversalQuestionDiagramProps } from '../components/diagrams/UniversalQuestionDiagram';

const ALL_SUBJECTS = ['I', 'We', 'You', 'They', 'He', 'She', 'It'];
const colors = ['indigo', 'emerald', 'sky', 'amber', 'purple', 'fuchsia'];

function extractHelper(sentence: string, sub: string, type: 'pos' | 'neg' | 'q' | 'nq'): string {
    let s = sentence.replace('[OBJ].', '').replace('[OBJ]?', '').replace('[OBJ]', '').trim();
    s = s.replace('[VERB]s', '').replace('[VERB]es', '').replace('[VERB]d', '').replace('[VERB]ed', '').replace('[VERB]', '').trim();
    
    // Remove subject
    let words = s.split(' ');
    words = words.filter(w => w.toLowerCase() !== sub.toLowerCase());
    
    const helper = words.join(' ').trim();
    
    if (helper === 's' || helper === 'es' || helper === 'd' || helper === 'ed') return '';
    return helper;
}

export function generateDiagramProps(dayId: string): { diagProps: UniversalDiagramProps, qDiagProps: UniversalQuestionDiagramProps } | null {
    const configs = dayConfigs[dayId];
    if (!configs) return null;
    
    const affKey = Object.keys(configs).find(k => k.includes('affirmative')) || Object.keys(configs)[0];
    const config = configs[affKey];
    if (!config) return null;

    const groupsMap: Record<string, string[]> = {};
    const helperData: Record<string, { base: string, neg: string }> = {};

    const qGroupsMap: Record<string, string[]> = {};
    const qHelperData: Record<string, { base: string, neg: string }> = {};

    let secondPartGlobal = '';

    for (const sub of ALL_SUBJECTS) {
        // Affirmative extraction
        const p = config.pos(sub, '[VERB]', '[OBJ]');
        const n = config.neg(sub, '[VERB]', '[OBJ]');
        let helperBase = extractHelper(p, sub, 'pos');
        let helperNeg = extractHelper(n, sub, 'neg');
        
        // Question extraction
        const q = config.q(sub, '[VERB]', '[OBJ]');
        const nq = config.nq(sub, '[VERB]', '[OBJ]');
        // Extract the FIRST word from the question (e.g. "Would" from "Would I like to [VERB] [OBJ]?")
        const qParts = q.replace('?', '').split(' ').filter(v => !!v);
        const qHelper = qParts[0]; 
        const nqParts = nq.replace('?', '').split(' ').filter(v => !!v);
        const nqHelper = nqParts[0];

        // Figure out second part if any (e.g. "like to" from "Would I like to play?")
        // Q: "Would I like to [VERB]" -> index of subject = 1. After subject comes secondPart.
        const lowerQ = q.toLowerCase();
        let secondPart = '';
        if (qParts.length > 2 && qParts[1].toLowerCase() === sub.toLowerCase()) {
             // Everything between subject and [VERB]
             const verbIndex = qParts.indexOf('[VERB]');
             if (verbIndex > 2) {
                 secondPart = qParts.slice(2, verbIndex).join(' ');
             }
        }
        if (secondPart && !secondPartGlobal) {
            secondPartGlobal = secondPart;
        }
        
        if (!helperBase) {
           if (qHelper) {
               helperBase = qHelper.toLowerCase();
           }
        }
        
        helperBase = helperBase.toLowerCase();
        helperNeg = helperNeg.toLowerCase();

        const key = `${helperBase}|||${helperNeg}`;
        if (!groupsMap[key]) {
            groupsMap[key] = [];
            helperData[key] = { base: helperBase, neg: helperNeg };
        }
        groupsMap[key].push(sub);

        const qKey = `${qHelper.toLowerCase()}|||${nqHelper.toLowerCase()}`;
        if (!qGroupsMap[qKey]) {
            qGroupsMap[qKey] = [];
            qHelperData[qKey] = { base: qHelper.toLowerCase(), neg: nqHelper.toLowerCase() };
        }
        qGroupsMap[qKey].push(sub);
    }

    const groups: DiagramGroup[] = Object.keys(groupsMap).map((key, i) => ({
        subjects: groupsMap[key],
        color: colors[i % colors.length] as any,
        helperBase: helperData[key].base,
        helperNeg: helperData[key].neg
    }));

    const qGroups: DiagramGroup[] = Object.keys(qGroupsMap).map((key, i) => ({
        subjects: qGroupsMap[key],
        color: colors[i % colors.length] as any,
        helperBase: qHelperData[key].base,
        helperNeg: qHelperData[key].neg
    }));

    let vLabel = 'base form';
    let vSymbol = 'V₁';
    if (config.verbForm === 'ing') { vLabel = 'ing form'; vSymbol = 'V₄'; }
    if (config.verbForm === 'past') { vLabel = 'past form'; vSymbol = 'V₂'; }
    if (config.verbForm === 'pp') { vLabel = 'past participle'; vSymbol = 'V₃'; }
    if (config.verbForm === 's') { vLabel = 's / es form'; vSymbol = 'V₅'; }

    let description = `Diagram for ${dayId.toUpperCase()}`;
    if (dayId === 'day1') description = 'To express an action that happens as a <span class="font-bold text-amber-600 dark:text-amber-400 border-b-2 border-amber-300 dark:border-amber-700 pb-1">habit</span>';
    if (dayId === 'day2') description = 'To express an action that happened in the <span class="font-bold text-amber-600 dark:text-amber-400 border-b-2 border-amber-300 dark:border-amber-700 pb-1">past</span>';
    if (dayId === 'day3') description = 'To express an action that will happen in the <span class="font-bold text-amber-600 dark:text-amber-400 border-b-2 border-amber-300 dark:border-amber-700 pb-1">future</span>';
    if (dayId === 'day4') description = 'To express an action that is happening <span class="font-bold text-amber-600 dark:text-amber-400 border-b-2 border-amber-300 dark:border-amber-700 pb-1">right now</span> (Present Continuous)';
    if (dayId === 'day5') description = 'To express an action that was happening in the <span class="font-bold text-amber-600 dark:text-amber-400 border-b-2 border-amber-300 dark:border-amber-700 pb-1">past</span> (Past Continuous)';
    if (dayId === 'day6') description = 'To express an action that will be happening in the <span class="font-bold text-amber-600 dark:text-amber-400 border-b-2 border-amber-300 dark:border-amber-700 pb-1">future</span> (Future Continuous)';
    if (dayId === 'day24' || dayId === 'day30') description = 'To express an action related to the <span class="font-bold text-amber-600 dark:text-amber-400 border-b-2 border-amber-300 dark:border-amber-700 pb-1">perfect present</span>';
    if (dayId === 'day25' || dayId === 'day31') description = 'To express an action related to the <span class="font-bold text-amber-600 dark:text-amber-400 border-b-2 border-amber-300 dark:border-amber-700 pb-1">perfect past</span>';
    if (dayId === 'day26' || dayId === 'day32') description = 'To express an action related to the <span class="font-bold text-amber-600 dark:text-amber-400 border-b-2 border-amber-300 dark:border-amber-700 pb-1">perfect future</span>';

    return {
        diagProps: {
            title: `Table of ${dayId.toUpperCase()}`,
            description: description,
            verbFormLabel: vLabel,
            verbFormSymbol: vSymbol,
            groups
        },
        qDiagProps: {
            title: `Question table for ${dayId.toUpperCase()}`,
            verbFormLabel: secondPartGlobal ? `${secondPartGlobal} + ${vLabel}` : vLabel,
            verbFormSymbol: vSymbol,
            groups: qGroups
        }
    }
}
