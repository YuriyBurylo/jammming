import React from 'react';
import styles from './Track.module.css';

function Track({object}) {
    return (
        <article className={styles.trackbox}>
            <div className={styles.name}>{object.name}</div>
            <div className={styles.artist}>{object.artist}</div>
            <div className={styles.album}>album: {object.album}</div>
        </article>
    );
}

export default Track;