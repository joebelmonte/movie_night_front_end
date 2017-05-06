'use strict'

const addNestedValue = require('./add-nested-value')

const getFormFieldsNoEmptyStrings = (form) => {
  const target = {}

  const elements = form.elements || []
  for (let i = 0; i < elements.length; i++) {
    const e = elements[i]
    if (!e.hasAttribute('name')) {
      continue
    }

    let type = 'TEXT'
    switch (e.nodeName.toUpperCase()) {
      case 'SELECT':
        type = e.hasAttribute('multiple') ? 'MULTIPLE' : type
        break
      case 'INPUT':
        type = e.getAttribute('type').toUpperCase()
        break
    }

    const name = e.getAttribute('name')

    if (type === 'MULTIPLE') {
      for (let i = 0; i < e.length; i++) {
        if (e[i].selected) {
          addNestedValue(target, name, e[i].value)
        }
      }
    } else if ((type !== 'RADIO' && type !== 'CHECKBOX') || e.checked) {
      addNestedValue(target, name, e.value)
    }
  }
  console.log('in get form fields no strings and target is ', target)

  const removeFalsy = (obj) => {
    const newObj = {}
    Object.keys(obj).forEach((prop) => {
      if (obj[prop]) { newObj[prop] = obj[prop] }
    })
    console.log('in removeFalsy and newObj is ', newObj)
    return newObj
  }

  removeFalsy(target)

  // return target
}

module.exports = getFormFieldsNoEmptyStrings
