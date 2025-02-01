import React from 'react';
import styles from './Track.module.css';

function Track({object}) {
    const artists = object.artists.map(item => <li key={item.id}>{item.name}</li>);
    return (
        <article className={styles.trackbox}>
            <div className={styles.name}>{object.name}</div>
            <div className={styles.artist}><ul>{artists}</ul></div>
            <div className={styles.album}>album: {object.album.name}</div>
        </article>
    );
}

export default Track;