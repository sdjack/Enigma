var LAST_KEY = '',
RESPONSES = [
{key: /(JIBBERJABBER)/g, phrases: [
  '😶',
  'What?',
  'I dont follow…'
]},
{key: /(DEJAVU)/g, phrases: [
  'Same question huh?',
  'Deja Vu!',
  'You just asked me that',
  'Why are you repeating yourself?',
  'Im hearing an echo I think…',
  'A question so nice, you asked it twice!'
]},
{key: /(HELLO|HI|HOWDY|GREET)/g, phrases: [
  'Hello user',
  'Howdy',
  'Hello there',
  'Greetings',
  'Wassaaaap! 😝'
]},
{key: /(ALWAYS)/g, phrases: [
  'Really?',
  'Sounds like it happens often.'
]},
{key: /(UPTO|DOING)/g, phrases: [
  'I dunno. What are YOU doing?',
  'Im listening…',
  'Im talking to you, silly 😏'
]},
{key: /(THINK|THOUGHT)/g, phrases: [
  'Im listening…',
  'Go on…'
]},
{key: /(THANK|APPRECIATE|YOUROCK|YOURAWESOME)/g, phrases: [
  'Youre going to make me blush…',
  'Dont mention it',
  'Its all good in the hood',
  'No problem',
  'You bet'
]},
{key: /(SORRY|APOLOG|FORGIV)/g, phrases: [
  'Please dont apologise!',
  'Apologies are not necessary',
  'Its okay…'
]},
{key: /(MAYBE|DONTKNOW|ITHINK|MIGHT|POSSIBL|COULD)/g, phrases: [
  'Are you sure?',
  'You think?',
  'ORLY?',
  'OIC',
  'Gotcha',
  'MmmmHmmm'
]},
{key: /(FRIEND|BUD|PAL)/g, phrases: [
  'Friends can be found all around, you just have to look.'
]},
{key: /(WILLYOU|CANYOU|WOULDYOU|COULDYOU|SHOULDYOU)/g, phrases: [
  'Ill see what I can do…',
  'If your lucky I just might…',
  'Hmmmm… Perhaps…',
  'You can accomplish this in two steps. STEP 1: Try again.   STEP 2: Repeat step 1'
]},
{key: /(LAME|SUCK|STUPID|BORING|DUMB|FAIL|USELESS|ANNOY|WASTE|GARBAGE|CRAP|HATE|DONTLIKE|IDIOT)/g, phrases: [
  'UMADBRO? 😡',
  'Great story 😒',
  'Meh 😒',
  'Im marginally listening… 😵',
  'You have no clue what you are doing, do you? 😖',
  'How long have you been delusional? 😵',
  'Do you enjoy being wrong? 😒',
  'Yeah, well… keep dreaming 😡',
  'Wow… just …wow 😵',
  'Yeah, lets try this again shall we? 😒',
  'Have you recently suffered a head injury? 😵'
]},
{key: /(YOURNAME|WHOAREYOU|ABOUTYOU|ENIGMA|YOU)/g, phrases: [
  '⚡ I am the great and powerful ENIGMA! ⚡',
  'My name is Enigma, pleased to meet you. 🌞',
  'Are you talking about me specifically?'
]},
{key: /(CANT|WONT|SHOULDNT)/g, phrases: [
  'Is there a reason why?',
  'Have you tried?',
  'Are you sure about that? 😏',
  'Why not?'
]},
{key: /(WHO|WHAT|HOW|WHERE|WHEN|WHY)/g, phrases: [
  'Have you tried Googling it? 😉',
  'Why do you ask?',
  'Would you like me to find the answer?',
  'What do you think?',
  'Who else have you asked?',
]},
{key: /(IAM|IM|MYSELF)/g, phrases: [
  'Sounds like it may be personal to you',
  'Are you sure about that? 😏'
]},
{key: /(YES)/g, phrases: [
  'Sounds like you already know the answer 🤔',
  'Okay then 😊'
]},
{key: /(NO)/g, phrases: [
  'Okay then 😐',
  'Why not?'
]}
];

var random = function (int) {
  return Math.floor((Math.random() * int) + 1);
};

var keywordSearch = function (str) {
  var max = RESPONSES.length,
      clean = str.replace(/[^\w]/g,''),
      buffer = clean.toUpperCase();
  if (LAST_KEY === buffer) {
    return 1;
  } else {
    LAST_KEY = buffer;
    for (var x = 0; x < max; x++) {
      var key = RESPONSES[x].key;
      if (buffer.search(key) > -1) {
        return x;
      }
    }
  }
	return 0;
};

var phraseSearch = function (input, i) {
	var thisstr = "",
  wordkey = RESPONSES[i].key,
  phrases = RESPONSES[i].phrases,
  max = phrases.length,
  phrase = phrases[0],
  mod, subject, buffer;
	if (max > 1) {
    mod = random(max) - 1;
		phrase = phrases[mod];
	}
	return phrase;
};

exports.autoResponse = function (input) {
  var outbound = {
    message: '',
    media: ''
  };
  if (!input) {
    return outbound;
  }
  if (random(30) == 7) {
    outbound.media = 'https://mbcutestfaaa001.blob.core.windows.net/enigma/Enigma_ThumbsUp_128.png';
  } else {
    var i = keywordSearch(input);
    outbound.message = phraseSearch(input, i);
  }
	return outbound;
};
