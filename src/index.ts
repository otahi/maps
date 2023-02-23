import axios from 'axios';

function initMap(): void {

    function addItem(item: any, map:google.maps.Map): void {
      const { name_ja, name_en, position, phone, url_ja, url_en} = item;

      let content = '';

      content +=
        url_ja ?
          `<div><a target="_blank" href="${url_ja}">${name_ja}</a></div>` :
          `<div>${name_ja}</div>`

      content +=
        url_en ?
          `<div><a target="_blank" href="${url_en}">${name_en}</a></div>` :
          `<div>${name_en}</div>`

      content +=
          `<div><a href="tel:${phone.replace("-","")}">${phone}</a></div>`

      const infowindow = new google.maps.InfoWindow({
        content: content,
        ariaLabel: name_ja,
      });

      const marker = new google.maps.Marker({
        position: position,
        map,
        title: name_ja,
        icon: { url: "./img/hospital.svg", scaledSize: new google.maps.Size(40, 40) },
      });

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      });
  }

  const ota = { lat: 35.561125, lng: 139.717268 };
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 14,
        center: ota,
      }
    );

    axios.get('data/tokyo/ota/hospital.json')
        .then((response:any) => {
            const items = new Array<{}>(...response.data);
            items.forEach( (value) => {
                addItem(value as any, map);
            })
        })
        .catch((error:any) => {
            console.error(error);
    });
}
declare global {
    interface Window {
      initMap: () => void;
    }
}

window.initMap = initMap;