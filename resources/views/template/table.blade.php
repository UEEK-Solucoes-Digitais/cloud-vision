<table class="clientTable">
    <tbody>
        @foreach ($user as $data)
            <tr>
                <td>{{ $data }}</td>
            </tr>
        @endforeach
    </tbody>
</table>

<span style="margin-top: 30px;"><b>Acesse o painel gestor para visualizar as informações completas</b></span>
