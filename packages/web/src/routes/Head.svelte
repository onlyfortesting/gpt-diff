<script>
  import { page } from "$app/stores";
  import {
    PUBLIC_BASE_URL,
    PUBLIC_FEED_TITLE,
    PUBLIC_SITE_LOCALE,
    PUBLIC_SITE_NAME,
    PUBLIC_SITE_TITLE,
  } from "$env/static/public";

  let head;
  $: {
    if ($page.status === 404) {
      head = {
        nocanonical: true,
        noindex: true,
        title: `Page not found - ${PUBLIC_SITE_NAME}`,
      };
    } else {
      head = $page.data.head || {};
    }
  }
  $: title = head.title || PUBLIC_SITE_TITLE;
</script>

<svelte:head>
  <link
    rel="alternate"
    title={PUBLIC_FEED_TITLE}
    type="application/atom+xml"
    href={`${PUBLIC_BASE_URL}/rss.xml`}
  />

  {#if head}
    <title>{title}</title>

    {#if head.noindex}
      <meta name="robots" content="noindex, follow" />
    {:else}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
    {/if}

    {#if !head.nocanonical}
      <link rel="canonical" href={head.canonical || $page.data.canonical} />
      <meta
        property="og:url"
        content={head.canonical || $page.data.canonical}
      />
    {/if}

    {#if head.description}
      <meta name="description" content={head.description} />
      <meta property="og:description" content={head.description} />
    {/if}

    <meta property="og:locale" content={head.locale || PUBLIC_SITE_LOCALE} />

    {#if head.type}
      <meta property="og:type" content={head.type} />
    {/if}

    <meta property="og:title" content={title} />
    <meta property="og:site_name" content={PUBLIC_SITE_NAME} />

    {#if head.image}
      <meta property="og:image" content={head.image} />
      <!-- <meta property="og:image:width" content={head.imageWidth} /> -->
      <!-- <meta property="og:image:height" content={head.imageHeight} /> -->
      <meta name="twitter:image" content={head.image} />
    {/if}

    {#if head.date}
      <meta property="article:published_time" content={head.date} />
    {/if}

    {#if head.update}
      <meta property="article:modified_time" content={head.update} />
    {/if}

    {#if head.author}
      <meta name="author" content={head.author} />
    {/if}

    <meta name="twitter:card" content="summary_large_image" />

    {#if head.fbPublisher}
      <meta property="article:publisher" content={head.fbPublisher} />
    {/if}

    {#if head.fbAuthor}
      <meta property="article:author" content={head.fbAuthor} />
    {/if}

    {#if head.twitterCreator}
      <meta name="twitter:creator" content={head.twitterCreator} />
    {/if}

    {#if head.twitterSite}
      <meta name="twitter:site" content={head.twitterSite} />
    {/if}

    <!-- <meta name="twitter:label1" content="Written by" /> -->
    <!-- <meta name="twitter:data1" content="Adam Enfroy" /> -->
    <!-- <meta name="twitter:label2" content="Est. reading time" /> -->
    <!-- <meta name="twitter:data2" content="29 minutes" /> -->
  {/if}
</svelte:head>
