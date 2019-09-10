import React from 'react';
import PropTypes from 'prop-types';
import imageUrlBuilder from '@sanity/image-url';

import styles from './Project.module.css';
import client from '../../../client';
import SimpleBlockContent from '../../SimpleBlockContent';


function urlFor(source) {
    return imageUrlBuilder(client).image(source);
}

function Project(props) {
    const { name, tags, description, image, links } = props;

    const style = image ? {
        backgroundImage: `url("${urlFor(image)
            .width(1260)
            .height(1024)
            .auto('format')
            .url()}")`,
        backgroundSize: 'cover'
    } : {};

    return (
        <div className={styles.root} style={style}>
            <div className={styles.content}>
                <h1 className={styles.title}>{name}</h1>
                {description && (
                    <SimpleBlockContent blocks={description} />
                )}
                {links && (
                    <div className={styles.linkContainer}>
                        {links.map((data) => (
                            <a
                                key={data.title}
                                className={styles.link}
                                href={data.href}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {data.title}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

Project.propTypes = {
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.array.isRequired,
    image: PropTypes.object.isRequired,
    links: PropTypes.arrayOf(PropTypes.object)
};

Project.defaultProps = {
    links: [],
    tags: []
};

export default Project;
