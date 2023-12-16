<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <meta name="robots" content="index, follow"/>
    <meta name="googlebot" content="index, follow"/>
    <meta name="google-site-verification" content=""/>
    <meta name="msvalidate.01" content=""/>
    <meta name="p:domain_verify" content=""/>


    <meta name="application-name" content=""/>
    <meta property="fb:app_id" content=""/>
    <meta property="twitter:account_id" content=""/>

    <title><?php echo $seo_title ?></title>
    <meta name="description" content="<?php echo $seo_description ?>"/>
    <meta name="keywords"
          content="<?php echo $seo_keyword ?>"/>
    <meta name="news_keywords"
          content="<?php echo $seo_keyword ?>"/>

    <meta property="og:type" content="article"/>
    <meta property="og:url" content="<?php echo base_url(uri_string()) ?>"/>
    <meta property="og:site_name" content="ApkHun">
    <meta property="og:title" name="twitter:title" itemprop="title name" content="<?php echo $seo_title ?>">
    <meta property="og:description" name="twitter:description" itemprop="description"
          content="<?php echo $seo_description ?>">
    <meta property="og:image" itemprop="image primaryImageOfPage" content="<?php echo $seo_image ?>"/>
    <meta property="og:image:width" content="600"/>
    <meta property="og:image:height" content="315"/>


    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="">
    <meta name="twitter:title" content="<?php echo $seo_title ?>">
    <meta name="twitter:description" content="<?php echo $seo_description ?>">
    <meta name="twitter:creator" content="">
    <meta name="twitter:image" content="<?php echo $seo_image ?>">
    <meta name="twitter:domain" content="">

    <?php
    $this->load->view('partials/css_and_js');
    ?>

</head>
<body>
