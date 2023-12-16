<?php

class My_Controller extends CI_Controller
{
    private function urlSafeB64Encode($input)
    {
        return str_replace('=', '', strtr(base64_encode($input), '+/', '-_'));
    }

    private function urlSafeB64Decode($input)
    {
        $remainder = strlen($input) % 4;
        if ($remainder) {
            $padlen = 4 - $remainder;
            $input .= str_repeat('=', $padlen);
        }
        return base64_decode(strtr($input, '-_', '+/'));
    }

    public function render($page_link = '', $data = array())
    {

        if ($page_link) {
            $far_title = "";
            $far_description = "";
            $seo_keyword = "";
            $seo_image = base_url();
            if (array_key_exists('seo_title', $data)) {
                $data['seo_title'] = $data['seo_title'];
            } else {
                $data['seo_title'] = $far_title;
            }
            if (array_key_exists('seo_description', $data)) {
                $data['seo_description'] = $data['seo_description'];
            } else {
                $data['seo_description'] = $far_description;
            }
            if (array_key_exists('seo_keyword', $data)) {
                $data['seo_keyword'] = $data['seo_keyword'];
            } else {
                $data['seo_keyword'] = $seo_keyword;
            }
            if (array_key_exists('seo_image', $data)) {
                $data['seo_image'] = $data['seo_image'];
            } else {
                $data['seo_image'] = $seo_image;
            }

            $data['content_with_full_page_partial'] = $page_link;
            $this->load->view('partials/template', $data);
        }
    }

    public function send_data($success = '', $message = '', $result = '')
    {
        $datetime = new DateTime();
        $data = array(
            'query' => array(
                'created' => $datetime->format(DateTime::ISO8601),
                "lang" => "en-US"
            ),
            'status' => array(
                'success' => $success,
                'message' => $message
            ),
            'result' => $result
        );

        echo json_encode($data);
    }

    public function mail_sender($to = '', $subject = '', $body = '')
    {

        return 1;

//        $from = "agencydelta3@gmail.com";

        $body = $this->make_perfect_email_content($body);

        $this->load->library('email');
        $config['protocol'] = 'smtp';

//        $config['smtp_host'] = 'ssl://smtp.googlemail.com';
//        $config['smtp_port'] = '465';
//        $config['smtp_user'] = $from;
//        $config['smtp_pass'] = '';

        $config['charset'] = 'utf-8';
        $config['newline'] = "\r\n";
        $config['mailtype'] = 'html';
        $config['wordwrap'] = TRUE;

        $this->email->initialize($config);
        $this->email->set_newline("\r\n");

        $this->email->from($from, 'ApkHun');
        $this->email->to($to);
        $this->email->subject($subject);
        $this->email->message($body);
        if ($this->email->send()) {
            $data['success'] = 1;
        } else {
            $data['success'] = 0;
            $data['error'] = $this->email->print_debugger(array('headers'));
        }
        return $data;
    }

    public function make_perfect_email_content($body = '')
    {
        $email_template_header = '<div style="
                                    background: #FAFAFA;
                                    margin: 0;
                                    text-decoration: none;
                                    font-family: sans-serif;
                                    color: #000;
                                    padding-left: 6%;
                                    padding-right: 6%;
                                    padding-bottom: 20px;">
                                       <p style="
                                            padding: 15px 0px;
                                            margin: 0px;
                                            font-size: 24px;">
                                          <a href="' . base_url() . '" style="
                                             text-decoration: none;
                                             color: #0085c6;">www.apkhun.com</a>
                                       </p>
                                       <div style="
                                            background-color: #fff;
                                            padding: 2%;
                                            font-size: 14px;
                                            color: #6d6a6a;">';

        $email_template_footer = '     
                                         <p style="
                                           margin-top:24px">Keep using ,
                                         </p>
                                         <p style="
                                             margin-top:24px">
                                             Customer Service Department
                                             <br>
                                             Email us: <a href="mailto:info@apkhun.com">info@apkhun.com</a>
                                         </p>
                                         <img src="https://d1ujqdpfgkvqfi.cloudfront.net/favicon-generator/htdocs/favicons/2020-07-01/7eb93271722e096ba0c18c6db203c01c.ico.png"
                                            style="width: 53px;">
                                        <p style="
                                             color: #9E9E9E;
                                             font-size: 12px;
                                             margin-top: 57px;
                                             font-style: italic;
                                             text-align: center;">
                                             This is an auto-generated message, please do not reply to this email address
                                        </p>
                                     </div>
                                   </div>';

        return $result = $email_template_header . $body . $email_template_footer;
    }


    public function is_valid_param($param = '', $otherwise = '')
    {
        $param = trim($param);
        if (strtolower($param) != 'null' && is_numeric($param) && $param > 0) {
            return $param;
        } elseif ($otherwise) {
            return $otherwise;
        } else {
            $this->send_data(0, 'Invalid parameter');
        }
    }

    public function encodeValue($value = '')
    {
        $secret = 'Mz';
        $this->load->library('encrypt');

        $secure_encrypted = $this->encrypt->encode(json_encode($value), $secret);
        $encoded_value = $this->urlSafeB64Encode($secure_encrypted);
        return $encoded_value;
    }

    public function decodeValue($value = '')
    {
        $secret = 'Mz';
        $this->load->library('encrypt');

        $decode_base64 = $this->urlSafeB64Decode($value);
        $decoded_value = $this->encrypt->decode($decode_base64, $secret);
        return $decoded_value;
    }

    public function debug($debugArray)
    {
        echo "<pre>";
        print_r($debugArray);
        echo "</pre>";
    }


//    for this site only

}