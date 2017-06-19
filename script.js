/* global location localStorage fetch */
;(function () {
  window.addEventListener('DOMContentLoaded', function () {
    $id('lang-en').onclick = function () {
      languageSet('en')
    }

    $id('lang-da').onclick = function () {
      languageSet('da')
    }

    const validLanguages = {
      en: 1,
      da: 1
    }

    var language = 'en'
    var storedLanguage = localStorage.getItem('lang')
    if (validLanguages[storedLanguage]) {
      language = storedLanguage
    }
    languageSet(language)
  })

  function languageSet (lang) {
    var data = localStorage.getItem('langData:' + lang)
    if (data) {
      languageApply(lang, JSON.parse(data))
      localStorage.setItem('lang', lang)
    } else {
      languageFetch(lang).then(data => {
        languageApply(lang, data)
        localStorage.setItem('lang', lang)
        localStorage.setItem('langData:' + lang, JSON.stringify(data))
      })
    }
  }

  function languageApply (lang, data) {
    [].slice.call(document.getElementsByTagName('html')).forEach((el) => {
      el.html = lang
    })
    var pageName =
      location.pathname === '/' ? 'index.html' : location.pathname.slice(1)
    pageName = pageName.slice(0, pageName.indexOf('.'))
    var pageText = Object.assign({}, data.all, data[pageName])
    if (pageText) {
      Object.keys(pageText).forEach(id => {
        var el = $id(id)
        if (el) el.innerHTML = pageText[id]
      })
    }
  }

  function languageFetch (language) {
    return fetch(`text-${language}.json`).then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('bad response')
    }).catch(err => {
      return err
    })
  }

  // lib
  var __document = window.document

  function $id (name, con) {
    return (con || __document).getElementById(name)
  }
}())
