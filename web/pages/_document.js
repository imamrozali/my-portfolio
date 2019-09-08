import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import client from '../client';


export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);

        return client.fetch('*[_id == "global-config"] {lang}.lang[0]').then((lang) => ({
            ...initialProps,
            lang
        }));
    }

    render() {
        return (
            <Html lang={this.props.lang || 'en'}>
                <Head>
                    <link href='https://fonts.googleapis.com/css?family=Inconsolata&display=swap' rel='stylesheet' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
