"use client";
import React from "react";
import styles from "./mymap.module.scss";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

function MyMap() {
  return (
    <section className={styles.mymap}>
      <YMaps style={{ height: "100%" }}>
        <Map
          defaultState={{
            center: [52.276139, 104.355732],
            zoom: 18,
            type: "yandex#map",
          }}
          modules={[]}
          instanceRef={(ref) => {
            ref && ref.behaviors.disable("scrollZoom");
            ref && ref.behaviors.disable("drag");
          }}
          style={{ height: "100%" }}
          className={styles.map}
        >
          <Placemark
            modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
            geometry={[52.2762, 104.355732]}
            options={{
              iconLayout: "default#image",
              iconImageSize: [74, 74],
              iconImageHref: "images/Outline.svg",
            }}
          />
        </Map>
      </YMaps>
    </section>
  );
}

export default MyMap;
