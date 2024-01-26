import React from "react";
import { useState } from 'react';
import { Marker, Popup, useMapEvents, Tooltip } from 'react-leaflet'
import { customIcon } from "./Icon"
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import getAllMediaFields from "../Plan/getAllMediaFields";
import getAllMediaFieldsSons from "../Plan/getAllMediaFieldsSons";
import Image from 'react-bootstrap/Image';

export default function ViewMediaLocationMarker(props) {



  const Medias = async (description) => {
    console.log(description)

    let data = await getAllMediaFields(description, "", "")
    props.setMedias(data)
    let media_sons = await getAllMediaFieldsSons(description, "", "")
    props.setMediaSons(media_sons)




  }


  return (
    <Marker position={props.mediaData.coordinadas || null} icon={customIcon}>
      <Tooltip direction="top" offset={[-15, -28]} permanent >
        {props.mediaData.description}
      </Tooltip>

      <Popup>
        <Container>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <Image style={{ width: '150px', height: "100px" }} src={"http://127.0.0.1:8000" + props.mediaData.category.image} rounded />
            </Col>
            <Col md={2}></Col>
          </Row>
          <Row>
            <p class="text-uppercase fw-bold lh-base">
              Categoría: {props.mediaData.category.description}<br />
              Descripción: {props.mediaData.description}<br />
              {props.mediaData.father_containers.length != 0 &&
                <span>Dentro de : 
                   <a
                    class="text-decoration-none"
                    onClick={() => Medias(props.mediaData.father_containers[0].father.description)}
                    href="#">{props.mediaData.father_containers[0].father.description}
                   </a>
                </span>}
            </p>
          </Row>
          <Row >
            <div className="border" style={{ maxHeight: "100px", overflowY: "scroll" }}>
              <p class="text-uppercase fw-bold lh-base">
                {props.mediaData.media_fields.map((media_field) =>
                  <div>
                    <span>
                      {media_field.field.name}:
                      {media_field.link_media != "" ?
                        <a
                          class="text-decoration-none"
                          onClick={() => props.getMediasLink(props.mediaData.description, media_field.link_media)}
                          href="#">
                          {media_field.field_value}
                        </a>
                        : media_field.field_value
                      }
                    </span></div>

                )}
              </p>
            </div>
          </Row>
          <Row>
            {props.mediaSons[0] &&
              <div className="border text-center mt-3 pt-1"><h6>Contiene</h6></div>}
            <div className="border" style={{ maxHeight: "100px", overflowY: "scroll" }}>
              <p class="text-uppercase fw-bold lh-base">
                {props.mediaSons[0] && props.mediaSons[0].son_containers.map((son) =>
                  <span>
                    <a class="text-decoration-none" onClick={() => Medias(son.son.description)}
                      href="#"
                    >
                      {son.son.description}
                    </a><br /></span>)}
              </p>
            </div>
          </Row>
        </Container>
      </Popup>
    </Marker>
  )
}