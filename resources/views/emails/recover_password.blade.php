<h1>Olá, {{ $data['user']['name'] }}!</h1>
<p>
    Recebemos uma solicitação para redefinir a senha da sua conta.<br>
    Utilize o botão abaixo para ser redirecionado:<br>
    <a href="{{ $data['url'] }}">Redefinir Senha</a>
</p>
