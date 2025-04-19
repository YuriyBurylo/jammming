import React from 'react';
import Track from '../Track/Track';
import Button from '../Button/Button';
import styles from './TrackList.module.css';

function TrackList({list, button, handleClick, playHandle}) {
    return (
        <ol>
            {
                list.map((track, index) => <li className={styles.container} key={index}><img className={styles.image} src={track.album.images[0].url} alt="album  cover"/><div className={styles.track}><Track object={track} /></div><div className={styles.add_btn}><Button identifier={track.id} handleClick={handleClick}>{button}</Button></div><div className={styles.play_btn}><Button identifier={track.id} handleClick={playHandle}>PLAY</Button></div></li>)
            }
        </ol>
    );
}

export default TrackList;