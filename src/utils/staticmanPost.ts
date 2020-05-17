interface KeyValue {
  [key: string]: string | number
}

const formatData = (fields: KeyValue, options: KeyValue = {}) => {
  const urlEncodedDataPairs: string[] = []

  Object.entries(fields).forEach(([key, value]) => {
    urlEncodedDataPairs.push(`${encodeURIComponent(`fields[${key}]`)}=${encodeURIComponent(value)}`)
  })

  Object.entries(options).forEach(([key, value]) => {
    urlEncodedDataPairs.push(`${encodeURIComponent(`options[${key}]`)}=${encodeURIComponent(value)}`)
  })

  return urlEncodedDataPairs.join('&').replace(/%20/g, '+')
}

const getApiBaseUrl = () => {
  const sleepDuration = 6
  const utcHour = new Date().getUTCHours()
  const apps = [
    { name: 'pratikriyaharu', sleepTime: 0 },
    { name: 'altpratikriyaharu', sleepTime: 12 },
  ]

  const { name } = apps.find(({ sleepTime }) => utcHour < sleepTime && utcHour > sleepTime + sleepDuration) || apps[0]

  return `https://${name}.herokuapp.com/v2/entry/himalay/himalay.github.io/develop`
}

export default (endpoint: string, fields: KeyValue, options?: KeyValue) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const apiBaseUrl = getApiBaseUrl()

    // on successful data submission
    xhr.addEventListener('load', resolve)

    // in case of error
    xhr.addEventListener('error', reject)

    xhr.open('POST', `${apiBaseUrl}${endpoint}`)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(formatData(fields, options))
  })
}
