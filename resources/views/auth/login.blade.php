@extends('layouts.master')

@section('content')

    <div class="card border-primary mt-5 mb-3" style="max-width: 30rem; margin: 0 auto;">
        <div class="card-header">Login</div>
        <div class="card-body">
            <form action="{{ route('login') }}" method="POST">
                @csrf

                <div class="form-group">
                    <input class="form-control @error('email') is-invalid @enderror" type="email" name="email" value="{{ old('email') }}" placeholder="Email" />
                    @error('email')
                        <span class="invalid-feedcack" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                <div class="form-group">
                    <input class="form-control @error('password') is-invalid @enderror" type="password" name="password" placeholder="Password" />
                    @error('password')
                        <span class="invalid-feedcack" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                <div class="form-group text-right">
                    <button class="btn btn-info mt-3" type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>

@endsection
