const en = require('../language/en')
const ar = require('../language/ar')

const languages = {
    en, ar
}
const translation = (language, key) => {
    if(languages?.[language]){
        return languages?.[language]?.[key] ?? key;
    }
    return languages['en']?.[key] ?? key;
}


module.exports = translation;
