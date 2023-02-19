import axios from 'axios';

function addItem(item:{name_ja:string, position:{lat:number, lng:number}}, map:google.maps.Map): void {
    const name_ja = item.name_ja;
    const postion = item.position;
    const content = `<div>${name_ja}</div>`;

    const infowindow = new google.maps.InfoWindow({
      content: content,
      ariaLabel: name_ja,
    });

    const marker = new google.maps.Marker({
      position: postion,
      map,
      title: name_ja,
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
      });
    });
}

function initMap(): void {
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