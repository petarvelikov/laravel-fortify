<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <meta name="author" content="Petar Velikov" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('packages/bootstrap-4.3.1-dist/css/bootstrap.min.css') }}" />
    {{-- <link rel="stylesheet" href="{{ asset('packages/fontawesome-free-5.11.2-web/css/all.min.css') }}" /> --}}
    {{-- <link rel="stylesheet" href="{{ asset('packages/bootstrap-datepicker-1.9.0-dist/css/bootstrap-datepicker.min.css') }}" /> --}}
    {{-- <link rel="stylesheet" href="{{ asset('packages/DataTables/datatables.min.css') }}" /> --}}
    {{-- <link rel="stylesheet" href="{{ asset('packages/toastr/toastr.min.css') }}" /> --}}
    {{-- <link rel="stylesheet" href="{{ asset('packages/Chart/Chart.min.css') }}" /> --}}

    <link href="{{ asset('src/css/main.css') }}" rel="stylesheet" />
    @yield('css-styles')
</head>
<body>

    <!-- Header content -->
    @include('partials.header')

    <!-- Main content -->
    <section id="my-section" class="container mt-4 mb-3">
    {{--  <section class=" mt-4 mb-3">  --}}
        @yield('content')
    </section>

    <!-- Scripts -->
    <script src="{{ asset('packages/jquery-3.4.1.min.js') }}"></script>
    <script src="{{ asset('packages/popper.min.js') }}"></script>
    {{-- <script src="{{ asset('packages/jquery.numeric.min.js') }}"></script> --}}
    {{-- <script src="{{ asset('packages/jQuery.print.js') }}"></script> --}}
    <script src="{{ asset('packages/bootstrap-4.3.1-dist/js/bootstrap.min.js') }}"></script>
    {{-- <script src="{{ asset('packages/fontawesome-free-5.11.2-web/js/all.min.js') }}"></script> --}}
    {{-- <script src="{{ asset('packages/bootstrap-datepicker-1.9.0-dist/js/bootstrap-datepicker.min.js') }}"></script> --}}
    {{-- <script src="{{ asset('packages/bootstrap-datepicker-1.9.0-dist/locales/bootstrap-datepicker.bg.min.js') }}"></script> --}}
    {{-- <script src="{{ asset('packages/DataTables/datatables.min.js') }}"></script> --}}
    {{-- <script src="{{ asset('packages/toastr/toastr.min.js') }}"></script> --}}
    {{-- <script src="{{ asset('packages/moment-with-locales.min.js') }}"></script> --}}
    {{-- <script src="{{ asset('packages/Chart/Chart.min.js') }}"></script> --}}

    <script src="{{ asset('src/js/main.js') }}" defer></script>
    @yield('js-scripts')

    {{-- @notify_render --}}

</body>

</html>
