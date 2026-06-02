export const fallbackLayout = {
    lang: 'en-fb',
    name: 'English Fallback',
    autor: 'SIGMATEK GmbH & Co KG',
    version: '1.0',
    layouts: {
        alpha: {
            layers: {
                normal: [
                    '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                    '{tab} q w e r t y u i o p [ ]',
                    'a s d f g h j k l ; \' \\ {accept}', 
                    '{shift} z x c v b n m , . / {shift}',
                    '{alt} {undo} {curleft} {space} {curright} {clear} {more}'
                ],
                shift: [
                    '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                    '{tab} Q W E R T Y U I O P { }',
                    'A S D F G H J K L : " | {accept}', 
                    '{shift} Z X C V B N M < > ? {shift}',
                    '{alt} {undo} {curleft} {space} {curright} {clear} {more}'
                ],
                alt: [
                    '{off} ¡ ² ³ ¤ € ¼ ½ ¾ ‘ ’ ¥ × {bksp}',
                    '{tab} ä å é ® þ ü ú í ó ö « »',
                    'á ß ð {off} {off} {off} {off} {off} ø ¶ ´ ¬ {accept}',
                    '{shift} æ {off} © {off} {off} ñ µ ç {off} ¿ {shift}',
                    '{alt} {undo} {curleft} {space} {curright} {clear} {more}'
                ],
                more: [
                    '{off} ¹ {off} {off} £ {off} {off} {off} {off} {off} {off} {off} ÷ {bksp}',
                    '{tab} Ä Å É {off} Þ Ü Ú Í Ó Ö {off} {off}',
                    'Á § Ð {off} {off} {off} {off} {off} Ø ° ¨ ¦ {off}',
                    '{shift} Æ {off} ¢ {off} {off} Ñ {off} Ç {off} {off} {shift}',
                    '{alt} {undo} {curleft} {space} {curright} {clear} {more}'
                ]
            }
        },
        numeric: {
            config: {
                regexValidation: 'numeric'
            },
            layers: {
                normal: [
                    '7 8 9 {bksp}',
                    '4 5 6 {increase}',
                    '1 2 3 {decrease}',
                    '. 0 {minus} {accept}'
                ]
            }
        },
        ipv4: {
            config: {
                regexValidation: 'ipv4'
            },
            layers: {
                normal: [
                    '7 8 9 {bksp}',
                    '4 5 6 {undo}',
                    '1 2 3 {clear}',
                    '. 0 {off} {accept}'
                ]
            }
        },
        hex: {
            config: {
                regexValidation: 'hex'
            },
            layers: {
                normal: [
                    'C D E F {bksp}',
                    '8 9 A B {undo}',
                    '4 5 6 7 {clear}',
                    '0 1 2 3 {accept}'
                ]
            }
        },
        time: {
            config: {
                regexValidation: 'time'
            },
            layers: {
                normal: [
                    '7 8 9 {bksp}',
                    '4 5 6 {undo}',
                    '1 2 3 {clear}',
                    ': 0 {off} {accept}'
                ]
            }
        },
        date: {
            config: {
                regexValidation: 'date'
            },
            layers: {
                normal: [
                    '7 8 9 {bksp}',
                    '4 5 6 {undo}',
                    '1 2 3 {clear}',
                    '. 0 - {accept}'
                ]
            }
        },
        full: {
            layers: {
                normal: [
                    '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                    '{tab} q w e r t y u i o p [ ]',
                    'a s d f g h j k l ; \' \u005C {accept}',
                    '{shift} z x c v b n m , . / {shift}',
                    '{alt} {undo} {curleft} {space} {curright} {clear} {more}'
                ],
                shift: [
                    '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                    '{tab} Q W E R T Y U I O P { }',
                    'A S D F G H J K L : \u0022 | {accept}',
                    '{shift} Z X C V B N M < > ? {shift}',
                    '{alt} {undo} {curleft} {space} {curright} {clear} {more}'
                ],
                alt: [
                    '{off} \u00A1 \u00B2 \u00B3 \u00A4 \u20AC \u00BC \u00BD \u00BE \u2018 \u2019 \u00A5 \u00D7 {bksp}',
                    '{tab} \u00E4 \u00E5 \u00E9 \u00AE \u00FE \u00FC \u00FA \u00ED \u00F3 \u00F6 \u00AB \u00BB',
                    '\u00E1 \u00DF \u00F0 {off} {off} {off} {off} {off} \u00F8 \u00B6 \u00B4 \u00AC {accept}',
                    '{shift} \u00E6 {off} \u00A9 {off} {off} \u00F1 \u00B5 \u00E7 {off} \u00BF {shift}',
                    '{alt} {undo} {curleft} {space} {curright} {clear} {more}'
                ],
                more: [
                    '{off} {off} {off} {off} {off} {off} {off} {off} {off} {off} {off} {off} {off} {off}',
                    '{off} {off} {curup} {off} {off} {increase} {off} {off} {off} {off} {off} {off} {off}',
                    '{off} {off} {curdow} {off} {off} {decrease} {off} {off} {off} {off} {off} {enter}',
                    '{shift} {off} {off} {off} {off} {off} {off} {off} {off} {off} {off} {off} {more}',
                    '{accept} {undo} {curleft} {space} {curright} {clear} {alt} {cancel}'
                ]
            }
        }
    }
};