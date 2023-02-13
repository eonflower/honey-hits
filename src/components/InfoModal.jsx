import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function InfoModal(props) {

    return (
    <>
        <Modal className='modal'
            show={props.show} 
            onHide={props.onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <div className='app-info'>
            <h2 className="info-q">What's Honey Hits?</h2>
            <p className="info-a">Honey Hits is the place you go to see all your sweetest jams! You'll find all your top favourite artists, tracks, and most recently liked songs on Spotify.</p>
            <br />
            <h2 className="info-q">Do I have to have a Spotify to use this?</h2>
            <p className="info-a">Yes. This site was created using Spotify Web API. It requires you to login to utilize.</p>
            <br />
            <h2 className="info-q">What about my personal information?</h2>
            <p className="info-a">None of your information will be stored to any server. All of the information gathered is essentially just plugged in from your personalized Spotify data.</p>
            <a className="login-link" onClick={props.onHide}>close</a>
            </div>
        </Modal>
    </>
    );
}

