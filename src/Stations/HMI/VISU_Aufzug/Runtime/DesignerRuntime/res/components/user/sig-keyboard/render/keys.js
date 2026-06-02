export const standardKey = {
    class: 'key standard',
};

export const specialKeys = [

    {
        key: '{bksp}',
        text: '\uf30a',
        class: 'key special symbol bksp',

    },
    {
        key: '{tab}',
        text: '\u2b72',
        class: 'key special u2800 tab',

    },
    {
        key: '{enter}',
        text: '\u2BA0',
        class: 'key special u2800 enter',
        config: { noRepeat: true },
    },
    {
        key: '{shift}',
        text: '\u2B06',
        class: 'key special u2800 shift',
        config: { noRepeat: true },
    },
    {
        key: '{accept}',
        text: '\uf00c',
        class: 'key special symbol accept',
        config: { noRepeat: true },
    },
    {
        key: '{alt}',
        text: 'ALT',
        class: 'key special alt',
        config: { noRepeat: true },
    },
    {
        key: '{space}',
        text: '\u00A0',
        class: 'key space',

    },
    {
        key: '{cancel}',
        text: '\uf00d',
        class: 'key special symbol cancel',
        config: { noRepeat: true },
    },
    {
        key: '{off}',
        text: '\u00A0',
        class: 'key off',

    },
    {
        key: '{more}',
        text: '\u2026',
        class: 'key special u2000 more',
        config: { noRepeat: true },
    },
    {
        key: '{curup}',
        text: '\u2191',
        class: 'key curup',

    },
    {
        key: '{curdow}',
        text: '\u2193',
        class: 'key curdown',

    },
    {
        key: '{curleft}',
        text: '\u2190',
        class: 'key curleft',

    },
    {
        key: '{curright}',
        text: '\u2192',
        class: 'key curright',

    },
    {
        key: '{clear}',
        text: '\u232B',
        class: 'key special u2000 clear',
        config: { noRepeat: true },
    },
    {
        key: '{increase}',
        text: '\u2BC5',
        class: 'key special u2800 increase',
    },
    {
        key: '{decrease}',
        text: '\u2BC6',
        class: 'key special u2800 decrease',
    },
    {
        key: '{minus}',
        text: '-',
        class: 'key minus',
    },
    {
        key: '{undo}',
        text: '\uf0e2',
        class: 'key special symbol undo',
        config: { noRepeat: true },
    },
    {
        key: '{newline}',
        text: '\u21b2',
        class: 'key special symbol newline',
        config: { noRepeat: true },
    },
    {
        key: '{empty}',
        text: '\u00A0',
        class: 'key empty',
    },
    {
        key: '{replace}',
        text: '\uf362',
        class: 'key special symbol replace',
        config: { noRepeat: true },

    },
    {
        key: '{imetoggle}',
        text: '\uf1ab',
        class: 'key special symbol imetoggle',
        config: { noRepeat: true },
    },
    {
        key: '{switchlayer}',
        text: '\uf5fd',
        class: 'key special switchlayer',
        config: { noRepeat: true },
        content: (data) => {
            let content = '';
            if (data.text) content += `<span class="label main symbol">${data.text}</span>`;
            if (data.config && data.config.switchLayer) content += `<span class="label sub">${data.config.switchLayer}</span>`;
            return content;
        }
    },
];

export const BACKSPACE = 'Backspace';
export const TAB = 'Tab';
export const ENTER = 'Enter';
export const SHIFT = 'Shift';
export const CONTROL = 'Control';
export const ALT = 'Alt';
export const CAPS_LOCK = 'CapsLock';
export const ESCAPE = 'Escape';
export const PAGE_UP = 'PageUp';
export const PAGE_DOWN = 'PageDown';
export const END = 'End';
export const HOME = 'Home';
export const ARROW_LEFT = 'ArrowLeft';
export const ARROW_UP = 'ArrowUp';
export const ARROW_RIGHT = 'ArrowRight';
export const ARROW_DOWN = 'ArrowDown';
export const INSERT = 'Insert';
export const DELETE = 'Delete';
export const NUM_LOCK = 'NumLock';
export const SCROLL_LOCK = 'ScrollLock';
export const PAUSE = 'Pause';
export const SPACE = ' ';
export const ACCEPT = 'Accept';
export const ALL_CANDIDATES = 'AllCandidates';
export const ALT_GRAPH = 'AltGraph';
export const APPS = 'Apps';
export const ATTN = 'Attn';
export const BROWSER_BACK = 'BrowserBack';
export const BROWSER_FAVORITES = 'BrowserFavorites';
export const BROWSER_FORWARD = 'BrowserForward';
export const BROWSER_HOME = 'BrowserHome';
export const BROWSER_REFRESH = 'BrowserRefresh';
export const BROWSER_SEARCH = 'BrowserSearch';
export const BROWSER_STOP = 'BrowserStop';
export const CANCEL = 'Cancel';
export const CLEAR = 'Clear';
export const CODE_INPUT = 'CodeInput';
export const COMPOSE = 'Compose';
export const CONVERT = 'Convert';
export const COPY = 'Copy';
export const CONTEXT_MENU = 'ContextMenu';
export const CR_SEL = 'CrSel';
export const CUT = 'Cut';
export const DEAD = 'Dead';
export const EJECT = 'Eject';
export const ERASE_EOF = 'EraseEof';
export const EXECUTE = 'Execute';
export const EX_SEL = 'ExSel';
export const F1 = 'F1';
export const F2 = 'F2';
export const F3 = 'F3';
export const F4 = 'F4';
export const F5 = 'F5';
export const F6 = 'F6';
export const F7 = 'F7';
export const F8 = 'F8';
export const F9 = 'F9';
export const F10 = 'F10';
export const F11 = 'F11';
export const F12 = 'F12';
export const F13 = 'F13';
export const F14 = 'F14';
export const F15 = 'F15';
export const F16 = 'F16';
export const F17 = 'F17';
export const F18 = 'F18';
export const F19 = 'F19';
export const F20 = 'F20';
export const F21 = 'F21';
export const F22 = 'F22';
export const F23 = 'F23';
export const F24 = 'F24';
export const FINAL_MODE = 'FinalMode';
export const FIND = 'Find';
export const FN = 'Fn';
export const FN_LOCK = 'FnLock';
export const FULL_STOP = 'FullStop';
export const GROUP_FIRST = 'GroupFirst';
export const GROUP_LAST = 'GroupLast';
export const GROUP_NEXT = 'GroupNext';
export const GROUP_PREVIOUS = 'GroupPrevious';
export const HANGUL_MODE = 'HangulMode';
export const HANJA_MODE = 'HanjaMode';
export const HELP = 'Help';
export const HIRAGANA = 'Hiragana';
export const HIRAGANA_KATAKANA = 'HiraganaKatakana';
export const JAPANESE_HIRAGANA = 'JapaneseHiragana';
export const JAPANESE_KATAKANA = 'JapaneseKatakana';
export const JAPANESE_ROMAJI = 'JapaneseRomaji';
export const JUNJA_MODE = 'JunjaMode';
export const KANA_MODE = 'KanaMode';
export const KANJI_MODE = 'KanjiMode';
export const KATAKANA = 'Katakana';
export const LANG1 = 'Lang1';
export const LANG2 = 'Lang2';
export const LANG3 = 'Lang3';
export const LANG4 = 'Lang4';
export const LANG5 = 'Lang5';
export const LANG6 = 'Lang6';
export const LANG7 = 'Lang7';
export const LANG8 = 'Lang8';
export const LANG9 = 'Lang9';
export const LAST_CANDIDATE = 'LastCandidate';
export const LAUNCH_APPLICATION1 = 'LaunchApplication1';
export const LAUNCH_APPLICATION2 = 'LaunchApplication2';
export const LAUNCH_MAIL = 'LaunchMail';
export const LAUNCH_MEDIA_PLAYER = 'LaunchMediaPlayer';
export const LEFT = 'Left';
export const META = 'Meta';
export const MEDIA_CHECK = 'MediaCheck';
export const MEDIA_CLOSE = 'MediaClose';
export const MEDIA_EJECT = 'MediaEject';
export const MEDIA_FAST_FORWARD = 'MediaFastForward';
export const MEDIA_NEXT_TRACK = 'MediaNextTrack';
export const MEDIA_PAUSE = 'MediaPause';
export const MEDIA_PLAY = 'MediaPlay';
export const MEDIA_PLAY_PAUSE = 'MediaPlayPause';
export const MEDIA_PREVIOUS_TRACK = 'MediaPreviousTrack';
export const MEDIA_RECORD = 'MediaRecord';
export const MEDIA_REWIND = 'MediaRewind';
export const MEDIA_SELECT = 'MediaSelect';
export const MEDIA_STOP = 'MediaStop';
export const MEDIA_TRACK_NEXT = 'MediaTrackNext';
export const MEDIA_TRACK_PREVIOUS = 'MediaTrackPrevious';
export const MEMO = 'Memo';
export const MENU = 'Menu';
export const MODE_CHANGE = 'ModeChange';
export const NAVIGATE_FORWARD = 'NavigateForward';
export const NAVIGATE_BACKWARD = 'NavigateBackward';
export const NON_CONVERT = 'NonConvert';
export const NONE = 'None';
export const NUMPAD0 = 'Numpad0';
export const NUMPAD1 = 'Numpad1';
export const NUMPAD2 = 'Numpad2';
export const NUMPAD3 = 'Numpad3';
export const NUMPAD4 = 'Numpad4';
export const NUMPAD5 = 'Numpad5';
export const NUMPAD6 = 'Numpad6';
export const NUMPAD7 = 'Numpad7';
export const NUMPAD8 = 'Numpad8';
export const NUMPAD9 = 'Numpad9';
export const NUMPAD_ADD = 'NumpadAdd';
export const NUMPAD_BACKSPACE = 'NumpadBackspace';
export const NUMPAD_CLEAR = 'NumpadClear';
export const NUMPAD_CLEAR_ENTRY = 'NumpadClearEntry';
export const NUMPAD_COMMA = 'NumpadComma';
export const NUMPAD_DECIMAL = 'NumpadDecimal';
export const NUMPAD_DIVIDE = 'NumpadDivide';
export const NUMPAD_ENTER = 'NumpadEnter';
export const NUMPAD_EQUAL = 'NumpadEqual';
export const NUMPAD_HASH = 'NumpadHash';
export const NUMPAD_MEMORY_ADD = 'NumpadMemoryAdd';
export const NUMPAD_MEMORY_CLEAR = 'NumpadMemoryClear';
export const NUMPAD_MEMORY_MULTIPLY = 'NumpadMemoryMultiply';
export const NUMPAD_MEMORY_RECALL = 'NumpadMemoryRecall';
export const NUMPAD_MEMORY_STORE = 'NumpadMemoryStore';
export const NUMPAD_MEMORY_SUBTRACT = 'NumpadMemorySubtract';
export const NUMPAD_MULTIPLY = 'NumpadMultiply';
export const NUMPAD_PAREN_LEFT = 'NumpadParenLeft';
export const NUMPAD_PAREN_RIGHT = 'NumpadParenRight';
export const NUMPAD_STAR = 'NumpadStar';
export const NUMPAD_SUBTRACT = 'NumpadSubtract';
export const OS_LEFT = 'OSLeft';
export const OS_RIGHT = 'OSRight';
export const PASTE = 'Paste';
export const PLAY = 'Play';
export const POWER = 'Power';
export const PREVIOUS_CANDIDATE = 'PreviousCandidate';
export const PRINT_SCREEN = 'PrintScreen';
export const PROCESS = 'Process';
export const PROPS = 'Props';
export const REDO = 'Redo';
export const RIGHT = 'Right';
export const ROMAJI = 'Romaji';
export const SELECT = 'Select';
export const SELECT_MEDIA = 'SelectMedia';
export const SINGLE_CANDIDATE = 'SingleCandidate';
export const SLEEP = 'Sleep';
export const STANDBY = 'Standby';
export const SNAP_SHOT = 'SnapShot';
export const STOP = 'Stop';
export const SYMBOL = 'Symbol';
export const SYS_REQ = 'SysReq';
export const UI_KEY_INPUT_DOWN_ARROW = 'UIKeyInputDownArrow';
export const UI_KEY_INPUT_LEFT_ARROW = 'UIKeyInputLeftArrow';
export const UI_KEY_INPUT_RIGHT_ARROW = 'UIKeyInputRightArrow';
export const UI_KEY_INPUT_UP_ARROW = 'UIKeyInputUpArrow';
export const UNDO = 'Undo';
export const UNIDENTIFIED = 'Unidentified';
export const UP = 'Up';
export const VALUE = 'Value';
export const VIEW = 'View';
export const AUDIO_VOLUME_UP = 'AudioVolumeUp';
export const AUDIO_VOLUME_DOWN = 'AudioVolumeDown';
export const AUDO_VOLUME_MUTE = 'AudioVolumeMute';
export const WAKE_UP = 'WakeUp';
export const ZENKAKU_HANAKU = 'ZenkakuHanaku';
export const ZOOM_IN = 'ZoomIn';
export const ZOOM_OUT = 'ZoomOut';

export const NON_PRINTABLE_KEYS = [
    BACKSPACE,
    TAB,
    ENTER,
    SHIFT,
    CONTROL,
    ALT,
    ALT_GRAPH,
    BROWSER_BACK,
    BROWSER_FAVORITES,
    BROWSER_FORWARD,
    BROWSER_HOME,
    BROWSER_REFRESH,
    BROWSER_SEARCH,
    BROWSER_STOP,
    CAPS_LOCK,
    CLEAR,
    ESCAPE,
    F1,
    F2,
    F3,
    F4,
    F5,
    F6,
    F7,
    F8,
    F9,
    F10,
    F11,
    F12,
    F13,
    F14,
    F15,
    F16,
    F17,
    F18,
    F19,
    F20,
    F21,
    F22,
    F23,
    F24,
    PAGE_UP,
    PAGE_DOWN,
    END,
    HOME,
    ARROW_LEFT,
    ARROW_UP,
    ARROW_RIGHT,
    ARROW_DOWN,
    INSERT,
    DELETE,
    NUM_LOCK,
    SCROLL_LOCK,
    PAUSE,
    CONTEXT_MENU,
    META,
    MEDIA_CHECK,
    MEDIA_CLOSE,
    MEDIA_EJECT,
    MEDIA_FAST_FORWARD,
    MEDIA_NEXT_TRACK,
    MEDIA_PAUSE,
    MEDIA_PLAY,
    MEDIA_PLAY_PAUSE,
    MEDIA_PREVIOUS_TRACK,
    MEDIA_RECORD,
    MEDIA_REWIND,
    MEDIA_SELECT,
    MEDIA_STOP,
    MEDIA_TRACK_NEXT,
    MEDIA_TRACK_PREVIOUS,
    NUMPAD_CLEAR,
    PRINT_SCREEN,
    SLEEP,
    STANDBY,
    UNIDENTIFIED,
    AUDIO_VOLUME_DOWN,
    AUDIO_VOLUME_UP,
    AUDO_VOLUME_MUTE,
    DEAD,
];

export const NON_PRINTABLE_KEYS_STRICT = [
    ACCEPT,
    ALL_CANDIDATES,
    ALT,
    ALT_GRAPH,
    APPS,
    ARROW_DOWN,
    ARROW_LEFT,
    ARROW_RIGHT,
    ARROW_UP,
    ATTN,
    AUDIO_VOLUME_DOWN,
    AUDIO_VOLUME_UP,
    AUDO_VOLUME_MUTE,
    BROWSER_BACK,
    BROWSER_FAVORITES,
    BROWSER_FORWARD,
    BROWSER_HOME,
    BROWSER_REFRESH,
    BROWSER_SEARCH,
    BROWSER_STOP,
    CAPS_LOCK,
    CANCEL,
    CLEAR,
    CODE_INPUT,
    COMPOSE,
    CONTROL,
    CONVERT,
    CONTEXT_MENU,
    COPY,
    CR_SEL,
    CUT,
    DEAD,
    DELETE,
    EJECT,
    END,
    ENTER,
    ERASE_EOF,
    ESCAPE,
    EXECUTE,
    EX_SEL,
    F1,
    F2,
    F3,
    F4,
    F5,
    F6,
    F7,
    F8,
    F9,
    F10,
    F11,
    F12,
    F13,
    F14,
    F15,
    F16,
    F17,
    F18,
    F19,
    F20,
    F21,
    F22,
    F23,
    F24,
    FINAL_MODE,
    FIND,
    FN,
    FN_LOCK,
    FULL_STOP,
    GROUP_FIRST,
    GROUP_LAST,
    GROUP_NEXT,
    GROUP_PREVIOUS,
    HANGUL_MODE,
    HANJA_MODE,
    HELP,
    HIRAGANA,
    HIRAGANA_KATAKANA,
    HOME,
    INSERT,
    JAPANESE_HIRAGANA,
    JAPANESE_KATAKANA,
    JAPANESE_ROMAJI,
    JUNJA_MODE,
    KANA_MODE,
    KANJI_MODE,
    KATAKANA,
    LANG1,
    LANG2,
    LANG3,
    LANG4,
    LANG5,
    LANG6,
    LANG7,
    LANG8,
    LANG9,
    LAST_CANDIDATE,
    LAUNCH_APPLICATION1,
    LAUNCH_APPLICATION2,
    LAUNCH_MAIL,
    LAUNCH_MEDIA_PLAYER,
    LEFT,
    META,
    MEDIA_CHECK,
    MEDIA_CLOSE,
    MEDIA_EJECT,
    MEDIA_FAST_FORWARD,
    MEDIA_NEXT_TRACK,
    MEDIA_PAUSE,
    MEDIA_PLAY,
    MEDIA_PLAY_PAUSE,
    MEDIA_PREVIOUS_TRACK,
    MEDIA_RECORD,
    MEDIA_REWIND,
    MEDIA_SELECT,
    MEDIA_STOP,
    MEDIA_TRACK_NEXT,
    MEDIA_TRACK_PREVIOUS,
    MEMO,
    MENU,
    MODE_CHANGE,
    NAVIGATE_FORWARD,
    NAVIGATE_BACKWARD,
    NON_CONVERT,
    NONE,
    NUM_LOCK,
    NUMPAD0,
    NUMPAD1,
    NUMPAD2,
    NUMPAD3,
    NUMPAD4,
    NUMPAD5,
    NUMPAD6,
    NUMPAD7,
    NUMPAD8,
    NUMPAD9,
    NUMPAD_ADD,
    NUMPAD_BACKSPACE,
    NUMPAD_CLEAR,
    NUMPAD_CLEAR_ENTRY,
    NUMPAD_COMMA,
    NUMPAD_DECIMAL,
    NUMPAD_DIVIDE,
    NUMPAD_ENTER,
    NUMPAD_EQUAL,
    NUMPAD_HASH,
    NUMPAD_MEMORY_ADD,
    NUMPAD_MEMORY_CLEAR,
    NUMPAD_MEMORY_MULTIPLY,
    NUMPAD_MEMORY_RECALL,
    NUMPAD_MEMORY_STORE,
    NUMPAD_MEMORY_SUBTRACT,
    NUMPAD_MULTIPLY,
    NUMPAD_PAREN_LEFT,
    NUMPAD_PAREN_RIGHT,
    NUMPAD_STAR,
    NUMPAD_SUBTRACT,
    OS_LEFT,
    OS_RIGHT,
    PAGE_DOWN,
    PAGE_UP,
    PASTE,
    PAUSE,
    PLAY,
    POWER,
    PREVIOUS_CANDIDATE,
    PRINT_SCREEN,
    PROCESS,
    PROPS,
    REDO,
    RIGHT,
    ROMAJI,
    SCROLL_LOCK,
    SELECT,
    SELECT_MEDIA,
    SHIFT,
    SINGLE_CANDIDATE,
    SLEEP,
    STANDBY,
    SNAP_SHOT,
    STOP,
    SYMBOL,
    SYS_REQ,
    TAB,
    UI_KEY_INPUT_DOWN_ARROW,
    UI_KEY_INPUT_LEFT_ARROW,
    UI_KEY_INPUT_RIGHT_ARROW,
    UI_KEY_INPUT_UP_ARROW,
    UNDO,
    UNIDENTIFIED,
    UP,
    VALUE,
    VIEW,
    WAKE_UP,
    ZENKAKU_HANAKU,
    ZOOM_IN,
    ZOOM_OUT,
];

export const NON_PREVENTED_KEYS = [
    F11,
    F12,
];