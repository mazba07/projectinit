<?php
$this->load->view('partials/header');
$this->load->view('partials/nav');
$this->load->view('pages/' . $content_with_full_page_partial);
$this->load->view('partials/footer');
