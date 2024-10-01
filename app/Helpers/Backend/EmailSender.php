<?php

use Illuminate\Support\Facades\Mail;

use Illuminate\Support\Facades\View;

use App\Models\ContactInfo;

use App\Mail\MailHandler;

// Formulário de contato
function mailContact($user)
{
    $contactInfo = ContactInfo::first();

    $title = "Novo contato";
    $parameters = [
        'title' => 'Novo contato',
        'image' => '',
        'btn_text' => '',
        'btn_href' => '',
    ];

    $html = View::make('template.table', ['user' => $user])->render();

    $lines = [
        "Olá, um novo contato de <b>{$user['name']}</b>  foi registrado em " . date('Y/m/d H:i'),
        $html,
    ];
    $success_message = "Recebemos seu contato.";

    return sendEmail($title, $contactInfo->email, $parameters, $lines, true, $success_message);
}

// Formulário de catálogo
function mailCatalog($user)
{
    $contactInfo = ContactInfo::first();

    $title = "Novo catálogo requisitado";
    $parameters = [
        'title' => 'Novo catálogo requisitado',
        'image' => '',
        'btn_text' => '',
        'btn_href' => '',
    ];

    $html = View::make('template.table', ['user' => $user])->render();

    $lines = [
        "Olá, um novo formulário de catálogo de <b>{$user['name']}</b> foi registrado em " . date('Y/m/d H:i'),
        $html,
    ];
    $success_message = "Recebemos seu contato.";

    return sendEmail($title, $contactInfo->catalogue_form_email, $parameters, $lines, true, $success_message);
}

// Formulário de vaga
function mailJob($user)
{
    $contactInfo = ContactInfo::first();

    $title = "Novo currículo recebido";
    $parameters = [
        'title' => 'Novo currículo recebido',
        'image' => '',
        'btn_text' => '',
        'btn_href' => '',
    ];

    $html = View::make('template.table', ['user' => $user])->render();

    $lines = [
        "Olá, um novo currículo enviado por <b>{$user['name']}</b> foi registrado em " . date('Y/m/d H:i'),
        $html,
    ];
    $success_message = "Recebemos seu currículo.";

    return sendEmail($title, $contactInfo->jobs_form_email, $parameters, $lines, true, $success_message);
}

// Formulário de ouvidoria
function mailSupport($user)
{
    $contactInfo = ContactInfo::first();

    $title = "Novo formulário de ouvidoria recebido";
    $parameters = [
        'title' => 'Novo formulário de ouvidoria recebido',
        'image' => '',
        'btn_text' => '',
        'btn_href' => '',
    ];

    $html = View::make('template.table', ['user' => $user])->render();

    $lines = [
        "Olá, um novo formulário enviado por <b>{$user['name']}</b> foi registrado em " . date('Y/m/d H:i'),
        $html,
    ];
    $success_message = "Recebemos sua situação.";

    return sendEmail($title, $contactInfo->support_form_email, $parameters, $lines, true, $success_message);
}

// Formulário de conduta e ética
function mailConduct($user)
{
    $contactInfo = ContactInfo::first();

    $title = "Novo formulário de conduta e ética recebido";
    $parameters = [
        'title' => 'Novo formulário de conduta e ética recebido',
        'image' => '',
        'btn_text' => '',
        'btn_href' => '',
    ];

    $html = View::make('template.table', ['user' => $user])->render();

    $lines = [
        "Olá, um novo formulário enviado por <b>{$user['name']}</b> foi registrado em " . date('Y/m/d H:i'),
        $html,
    ];
    $success_message = "Recebemos sua situação.";

    return sendEmail($title, $contactInfo->conduct_form_email, $parameters, $lines, true, $success_message);
}

// função principal para envio de e-mail
function sendEmail($title, $mail_to, $parameters, $lines, $return = true, $success_message = 'E-mail enviado com sucesso.')
{
    // $mail_to = 'lucas@ueek.digital';

    if (Mail::send(new MailHandler(
        ($title . " | " . config('app.name')),
        $mail_to,
        $parameters,
        $lines
    ))) {
        if ($return) {
            return [
                'status' => 1,
                'message' => $success_message,
            ];
        }
    } else {

        if ($return) {
            return [
                'status' => 0,
                'message' => "Ocorreu um erro interno ao enviar seu email. Já estamos trabalhando nisso, tente novamente mais tarde.",
            ];
        }
    }
}
