@if (request()->routeIs('admin.*'))
    @include('admin/app')
@else
    @include('site/app')
@endif
