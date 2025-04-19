import React from 'react';
import styles from './Track.module.css';

function Track({object}) {
    const artists = object.artists.map(item => <li key={item.id}>{item.name}</li>);
    const duration_ms = object.duration_ms;
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = Math.round((duration_ms % 60000) / 1000);

    return (
        <article className={styles.trackbox}>
            <div className={styles.name}>{object.name}</div>
            <div className={styles.artist}>performed by:<ul className={styles.artist_list}>{artists}</ul></div>
            <div className={styles.album}>album: {object.album.name} released: {object.album.release_date}</div>
            <div className={styles.duration}>duration: {minutes + ":" + (seconds < 10 ? "0" + seconds : seconds)}</div>
        </article>
    );
}

export default Track;