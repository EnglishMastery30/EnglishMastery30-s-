import { generateSentences } from '../utils/sentenceGenerator';

export const modalsDayEleven = generateSentences([
  {
    title: 'Conditionals & Habits (WOULD)',
    verbForm: 'base',
    pos: (sub, verb, obj) => `${sub} would ${verb} ${obj}.`,
    neg: (sub, verb, obj) => `${sub} would not ${verb} ${obj}.`,
    q: (sub, verb, obj) => `Would ${sub} ${verb} ${obj}?`,
    nq: (sub, verb, obj) => `Wouldn't ${sub} ${verb} ${obj}?`
  }
]);

export const obligationDayTwelve = generateSentences([
  {
    title: 'External Obligation (HAVE/HAS TO)',
    verbForm: 'base',
    pos: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} has to ${verb} ${obj}.` : `${sub} have to ${verb} ${obj}.`,
    neg: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} does not have to ${verb} ${obj}.` : `${sub} do not have to ${verb} ${obj}.`,
    q: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `Does ${sub} have to ${verb} ${obj}?` : `Do ${sub} have to ${verb} ${obj}?`,
    nq: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `Doesn't ${sub} have to ${verb} ${obj}?` : `Don't ${sub} have to ${verb} ${obj}?`
  }
]);

export const necessityDayThirteen = generateSentences([
  {
    title: 'Necessity (NEED TO / NEEDS TO)',
    verbForm: 'base',
    pos: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} needs to ${verb} ${obj}.` : `${sub} need to ${verb} ${obj}.`,
    neg: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} does not need to ${verb} ${obj}.` : `${sub} do not need to ${verb} ${obj}.`,
    q: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `Does ${sub} need to ${verb} ${obj}?` : `Do ${sub} need to ${verb} ${obj}?`,
    nq: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `Doesn't ${sub} need to ${verb} ${obj}?` : `Don't ${sub} need to ${verb} ${obj}?`
  }
]);

export const desireDayFourteen = generateSentences([
  {
    title: 'Desire (WANT TO / WANTS TO)',
    verbForm: 'base',
    pos: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} wants to ${verb} ${obj}.` : `${sub} want to ${verb} ${obj}.`,
    neg: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} does not want to ${verb} ${obj}.` : `${sub} do not want to ${verb} ${obj}.`,
    q: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `Does ${sub} want to ${verb} ${obj}?` : `Do ${sub} want to ${verb} ${obj}?`,
    nq: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `Doesn't ${sub} want to ${verb} ${obj}?` : `Don't ${sub} want to ${verb} ${obj}?`
  }
]);

export const challengeDayFifteen = generateSentences([
  {
    title: 'Challenge (DARE TO / DARES TO)',
    verbForm: 'base',
    pos: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} dares to ${verb} ${obj}.` : `${sub} dare to ${verb} ${obj}.`,
    neg: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} does not dare to ${verb} ${obj}.` : `${sub} do not dare to ${verb} ${obj}.`,
    q: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `Does ${sub} dare to ${verb} ${obj}?` : `Do ${sub} dare to ${verb} ${obj}?`,
    nq: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `Doesn't ${sub} dare to ${verb} ${obj}?` : `Don't ${sub} dare to ${verb} ${obj}?`
  }
]);

export const wishDaySixteen = generateSentences([
  {
    title: 'Strong Desire (WISH TO / WISHES TO)',
    verbForm: 'base',
    pos: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} wishes to ${verb} ${obj}.` : `${sub} wish to ${verb} ${obj}.`,
    neg: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} does not wish to ${verb} ${obj}.` : `${sub} do not wish to ${verb} ${obj}.`,
    q: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `Does ${sub} wish to ${verb} ${obj}?` : `Do ${sub} wish to ${verb} ${obj}?`,
    nq: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `Doesn't ${sub} wish to ${verb} ${obj}?` : `Don't ${sub} wish to ${verb} ${obj}?`
  }
]);

export const politeRequestDaySeventeen = generateSentences([
  {
    title: 'Polite Request (WOULD LIKE TO)',
    verbForm: 'base',
    pos: (sub, verb, obj) => `${sub} would like to ${verb} ${obj}.`,
    neg: (sub, verb, obj) => `${sub} would not like to ${verb} ${obj}.`,
    q: (sub, verb, obj) => `Would ${sub} like to ${verb} ${obj}?`,
    nq: (sub, verb, obj) => `Wouldn't ${sub} like to ${verb} ${obj}?`
  }
]);

export const dutyDayEighteen = generateSentences([
  {
    title: 'Moral Duty (OUGHT TO)',
    verbForm: 'base',
    pos: (sub, verb, obj) => `${sub} ought to ${verb} ${obj}.`,
    neg: (sub, verb, obj) => `${sub} ought not to ${verb} ${obj}.`,
    q: (sub, verb, obj) => `Ought ${sub} to ${verb} ${obj}?`,
    nq: (sub, verb, obj) => `Oughtn't ${sub} to ${verb} ${obj}?`
  }
]);

export const plannedFutureDayNineteen = generateSentences([
  {
    title: 'Planned Future (GOING TO)',
    verbForm: 'base',
    pos: (sub, verb, obj) => sub === 'I' ? `${sub} am going to ${verb} ${obj}.` : sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} is going to ${verb} ${obj}.` : `${sub} are going to ${verb} ${obj}.`,
    neg: (sub, verb, obj) => sub === 'I' ? `${sub} am not going to ${verb} ${obj}.` : sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} is not going to ${verb} ${obj}.` : `${sub} are not going to ${verb} ${obj}.`,
    q: (sub, verb, obj) => sub === 'I' ? `Am ${sub} going to ${verb} ${obj}?` : sub === 'He' || sub === 'She' || sub === 'It' ? `Is ${sub} going to ${verb} ${obj}?` : `Are ${sub} going to ${verb} ${obj}?`,
    nq: (sub, verb, obj) => sub === 'I' ? `Aren't ${sub} going to ${verb} ${obj}?` : sub === 'He' || sub === 'She' || sub === 'It' ? `Isn't ${sub} going to ${verb} ${obj}?` : `Aren't ${sub} going to ${verb} ${obj}?`
  }
]);

export const abilityDayTwenty = generateSentences([
  {
    title: 'Capability (ABLE TO)',
    verbForm: 'base',
    pos: (sub, verb, obj) => sub === 'I' ? `${sub} am able to ${verb} ${obj}.` : sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} is able to ${verb} ${obj}.` : `${sub} are able to ${verb} ${obj}.`,
    neg: (sub, verb, obj) => sub === 'I' ? `${sub} am not able to ${verb} ${obj}.` : sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} is not able to ${verb} ${obj}.` : `${sub} are not able to ${verb} ${obj}.`,
    q: (sub, verb, obj) => sub === 'I' ? `Am ${sub} able to ${verb} ${obj}?` : sub === 'He' || sub === 'She' || sub === 'It' ? `Is ${sub} able to ${verb} ${obj}?` : `Are ${sub} able to ${verb} ${obj}?`,
    nq: (sub, verb, obj) => sub === 'I' ? `Aren't ${sub} able to ${verb} ${obj}?` : sub === 'He' || sub === 'She' || sub === 'It' ? `Isn't ${sub} able to ${verb} ${obj}?` : `Aren't ${sub} able to ${verb} ${obj}?`
  }
]);

export const pastObligationDayTwentyOne = generateSentences([
  {
    title: 'Past Obligation (HAD TO)',
    verbForm: 'base',
    pos: (sub, verb, obj) => `${sub} had to ${verb} ${obj}.`,
    neg: (sub, verb, obj) => `${sub} did not have to ${verb} ${obj}.`,
    q: (sub, verb, obj) => `Did ${sub} have to ${verb} ${obj}?`,
    nq: (sub, verb, obj) => `Didn't ${sub} have to ${verb} ${obj}?`
  }
]);

export const willingnessDayTwentyTwo = generateSentences([
  {
    title: 'Willingness (WILLING TO)',
    verbForm: 'base',
    pos: (sub, verb, obj) => sub === 'I' ? `${sub} am willing to ${verb} ${obj}.` : sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} is willing to ${verb} ${obj}.` : `${sub} are willing to ${verb} ${obj}.`,
    neg: (sub, verb, obj) => sub === 'I' ? `${sub} am not willing to ${verb} ${obj}.` : sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} is not willing to ${verb} ${obj}.` : `${sub} are not willing to ${verb} ${obj}.`,
    q: (sub, verb, obj) => sub === 'I' ? `Am ${sub} willing to ${verb} ${obj}?` : sub === 'He' || sub === 'She' || sub === 'It' ? `Is ${sub} willing to ${verb} ${obj}?` : `Are ${sub} willing to ${verb} ${obj}?`,
    nq: (sub, verb, obj) => sub === 'I' ? `Aren't ${sub} willing to ${verb} ${obj}?` : sub === 'He' || sub === 'She' || sub === 'It' ? `Isn't ${sub} willing to ${verb} ${obj}?` : `Aren't ${sub} willing to ${verb} ${obj}?`
  }
]);

export const presentPerfectDayTwentyFour = generateSentences([
  {
    title: 'Present Perfect (HAVE/HAS)',
    verbForm: 'pp',
    pos: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} has ${verb} ${obj}.` : `${sub} have ${verb} ${obj}.`,
    neg: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} has not ${verb} ${obj}.` : `${sub} have not ${verb} ${obj}.`,
    q: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `Has ${sub} ${verb} ${obj}?` : `Have ${sub} ${verb} ${obj}?`,
    nq: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `Hasn't ${sub} ${verb} ${obj}?` : `Haven't ${sub} ${verb} ${obj}?`
  }
]);

export const pastPerfectDayTwentyFive = generateSentences([
  {
    title: 'Past Perfect (HAD)',
    verbForm: 'pp',
    pos: (sub, verb, obj) => `${sub} had ${verb} ${obj}.`,
    neg: (sub, verb, obj) => `${sub} had not ${verb} ${obj}.`,
    q: (sub, verb, obj) => `Had ${sub} ${verb} ${obj}?`,
    nq: (sub, verb, obj) => `Hadn't ${sub} ${verb} ${obj}?`
  }
]);

export const futurePerfectDayTwentySix = generateSentences([
  {
    title: 'Future Perfect (WILL HAVE)',
    verbForm: 'pp',
    pos: (sub, verb, obj) => `${sub} will have ${verb} ${obj}.`,
    neg: (sub, verb, obj) => `${sub} will not have ${verb} ${obj}.`,
    q: (sub, verb, obj) => `Will ${sub} have ${verb} ${obj}?`,
    nq: (sub, verb, obj) => `Won't ${sub} have ${verb} ${obj}?`
  }
]);

export const pastAdviceDayTwentySeven = generateSentences([
  {
    title: 'Past Advice & Certainty (SHOULD HAVE / MUST HAVE)',
    verbForm: 'pp',
    pos: (sub, verb, obj) => `${sub} should have ${verb} ${obj}.`,
    neg: (sub, verb, obj) => `${sub} should not have ${verb} ${obj}.`,
    q: (sub, verb, obj) => `Should ${sub} have ${verb} ${obj}?`,
    nq: (sub, verb, obj) => `Shouldn't ${sub} have ${verb} ${obj}?`
  }
]);

export const pastPossibilityDayTwentyEight = generateSentences([
  {
    title: 'Past Possibility (MAY HAVE / MIGHT HAVE)',
    verbForm: 'pp',
    pos: (sub, verb, obj) => `${sub} might have ${verb} ${obj}.`,
    neg: (sub, verb, obj) => `${sub} might not have ${verb} ${obj}.`,
    q: (sub, verb, obj) => `Might ${sub} have ${verb} ${obj}?`,
    nq: (sub, verb, obj) => `Mightn't ${sub} have ${verb} ${obj}?`
  }
]);

export const pastConditionalsDayTwentyNine = generateSentences([
  {
    title: 'Past Conditionals (WOULD HAVE / COULD HAVE)',
    verbForm: 'pp',
    pos: (sub, verb, obj) => `${sub} would have ${verb} ${obj}.`,
    neg: (sub, verb, obj) => `${sub} would not have ${verb} ${obj}.`,
    q: (sub, verb, obj) => `Would ${sub} have ${verb} ${obj}?`,
    nq: (sub, verb, obj) => `Wouldn't ${sub} have ${verb} ${obj}?`
  }
]);

export const presentPerfectContDayThirty = generateSentences([
  {
    title: 'Present Perfect Continuous (HAVE BEEN / HAS BEEN)',
    verbForm: 'ing',
    pos: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} has been ${verb} ${obj}.` : `${sub} have been ${verb} ${obj}.`,
    neg: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `${sub} has not been ${verb} ${obj}.` : `${sub} have not been ${verb} ${obj}.`,
    q: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `Has ${sub} been ${verb} ${obj}?` : `Have ${sub} been ${verb} ${obj}?`,
    nq: (sub, verb, obj) => sub === 'He' || sub === 'She' || sub === 'It' ? `Hasn't ${sub} been ${verb} ${obj}?` : `Haven't ${sub} been ${verb} ${obj}?`
  }
]);

export const pastPerfectContDayThirtyOne = generateSentences([
  {
    title: 'Past Perfect Continuous (HAD BEEN)',
    verbForm: 'ing',
    pos: (sub, verb, obj) => `${sub} had been ${verb} ${obj}.`,
    neg: (sub, verb, obj) => `${sub} had not been ${verb} ${obj}.`,
    q: (sub, verb, obj) => `Had ${sub} been ${verb} ${obj}?`,
    nq: (sub, verb, obj) => `Hadn't ${sub} been ${verb} ${obj}?`
  }
]);

export const futurePerfectContDayThirtyTwo = generateSentences([
  {
    title: 'Future Perfect Continuous (WILL HAVE BEEN)',
    verbForm: 'ing',
    pos: (sub, verb, obj) => `${sub} will have been ${verb} ${obj}.`,
    neg: (sub, verb, obj) => `${sub} will not have been ${verb} ${obj}.`,
    q: (sub, verb, obj) => `Will ${sub} have been ${verb} ${obj}?`,
    nq: (sub, verb, obj) => `Won't ${sub} have been ${verb} ${obj}?`
  }
]);

export const pastContAdviceDayThirtyThree = generateSentences([
  {
    title: 'Past Continuous Advice (SHOULD HAVE BEEN)',
    verbForm: 'ing',
    pos: (sub, verb, obj) => `${sub} should have been ${verb} ${obj}.`,
    neg: (sub, verb, obj) => `${sub} should not have been ${verb} ${obj}.`,
    q: (sub, verb, obj) => `Should ${sub} have been ${verb} ${obj}?`,
    nq: (sub, verb, obj) => `Shouldn't ${sub} have been ${verb} ${obj}?`
  }
]);

export const pastContPossibilityDayThirtyFour = generateSentences([
  {
    title: 'Past Continuous Possibility (MAY HAVE BEEN)',
    verbForm: 'ing',
    pos: (sub, verb, obj) => `${sub} might have been ${verb} ${obj}.`,
    neg: (sub, verb, obj) => `${sub} might not have been ${verb} ${obj}.`,
    q: (sub, verb, obj) => `Might ${sub} have been ${verb} ${obj}?`,
    nq: (sub, verb, obj) => `Mightn't ${sub} have been ${verb} ${obj}?`
  }
]);

export const pastContConditionalsDayThirtyFive = generateSentences([
  {
    title: 'Past Continuous Conditionals (WOULD HAVE BEEN)',
    verbForm: 'ing',
    pos: (sub, verb, obj) => `${sub} would have been ${verb} ${obj}.`,
    neg: (sub, verb, obj) => `${sub} would not have been ${verb} ${obj}.`,
    q: (sub, verb, obj) => `Would ${sub} have been ${verb} ${obj}?`,
    nq: (sub, verb, obj) => `Wouldn't ${sub} have been ${verb} ${obj}?`
  }
]);
