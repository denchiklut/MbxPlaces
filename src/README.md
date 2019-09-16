```js
<MbxPlaces 
    onSelect={ address => console.log(address) }
    apiKey="YOUR_API_KEY"
/>
```
## Поиск по регмону
```js
<MbxPlaces 
    limit={ 10 }
    placeholder="Search some address"
    onSelect={ address => console.log(address) }
    bbox={ [-79.76194404,40.47739894,-71.79556945,45.01586104] }
    apiKey="YOUR_API_KEY"
/>
```
