<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailHandler extends Mailable
{
    use Queueable, SerializesModels;

    private $title;
    private $mail_to;
    private $parameters;
    private $lines;

    public function __construct($title, $mail_to, $parameters, $lines)
    {
        $this->title = $title;
        $this->mail_to = $mail_to;
        $this->parameters = $parameters;
        $this->lines = $lines;
    }

    public function build()
    {
        $mail_view = $this->view('template.email')
            ->to($this->mail_to)
            ->to("suporte@ueek.digital")
            ->subject($this->title)
            ->with([
                'title' => $this->title,
                'parameters' => $this->parameters,
                'lines' => $this->lines,
            ]);

        return $mail_view;
    }
}
