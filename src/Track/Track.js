import React from 'react';
import styles from './Track.module.css';

function Track(props) {
    return (
        <article className={styles.trackbox}>
            <div className={styles.name}>{props.object.name}</div>
            <div className={styles.artist}>{props.object.artist}</div>
            <div className={styles.album}>album: {props.object.album}</div>
        </article>
    );
}

export default Track;