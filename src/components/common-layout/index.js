"use client";

import { motion } from "framer-motion";
import Navbar from "../navbar";
import Head from "next/head";
import MediaRow from "../media-row";
import Banner from "../banner";
import MediaItem from "../media-item";

export default function CommonLayout({ mediaData }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Head>
        <title>Netflix</title>
      <meta name="google-site-verification" content="w3DGPUyXUvPLhZt_iGR9zSy5YqKRQJGPGiI8KiqDzCA" />
      </Head>
      <>
        <Navbar />
        <div className="relative pl-4 pb-24 lg:space-y-24">
          <Banner
            medias={mediaData && mediaData.length ? mediaData[0].medias : []}
            media = {MediaItem}
          />
          <section className="md:space-y-16">
            {mediaData && mediaData.length
              ? mediaData.map((item) => (
                  <div key={item.title}>
                  <MediaRow title={item.title} medias={item.medias} />
                  </div>
                ))
              : null}
          </section>
        </div>
      </>
    </motion.div>
  );
}
