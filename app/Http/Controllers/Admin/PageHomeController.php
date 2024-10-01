<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageHome;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PageHomeController extends Controller
{
    public function index()
    {
        $content = getSeoSimple("Página Home - Empresa", 'CMS UEEK');
        $pageHome = PageHome::first();

        return Inertia::render('admin/page_home/page', compact(['content', 'pageHome']))
            ->withViewData(['title' => $content->seoTitle, 'description' => $content->seoDescription]);
    }

    public function post(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'seo_title' => 'required',
                'seo_description' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Erro de validação.',
                    'errors' => $validator->errors()
                ], 422);
            }

            $pageHome = PageHome::first();

            if (!$pageHome) {
                $pageHome = new PageHome();
                $pageHome->save();
            }
            
            $pageHome->seo_title = $request->seo_title;
            $pageHome->seo_description = $request->seo_description;

            $pageHome->save();

            return response()->json([
                'title' => 'Concluído.',
                'message' => 'Página home salva com sucesso.',
                'type' => 'success'
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'title' => 'Ocorreu um erro.',
                'message' => 'Não foi possível completar a operação no momento. Tente novamente mais tarde.',
                'type' => 'alert',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
