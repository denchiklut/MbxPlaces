## MbxPlaces

MbxPlaces is a simple address suggester based on MapBox API

## Usage example

```js
<MbxPlaces 
    limit={ 10 }
    onSelect={ address => console.log(address) }
    apiKey="YOUR_API_KEY"
/>
```
## props

| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| limit        | number  | 5       | count of suggested addresses |
| onSelect     | func    | required | handler on address selected |
| apiKey       | string  | required | your API key for MapBox |
