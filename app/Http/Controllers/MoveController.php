<?php

namespace App\Http\Controllers;

use App\Models\Move;
use Illuminate\Http\Request;

class MoveController extends Controller
{
    public function index(Request $request)
    {
        $query = Move::query()->orderBy('name');

        if ($search = $request->get('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        if ($category = $request->get('category')) {
            $query->where('category', $category);
        }

        return $query->get();
    }
}
