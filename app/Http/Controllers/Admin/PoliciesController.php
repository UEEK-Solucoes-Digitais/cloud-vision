<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactInfo;
use App\Models\Policies;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PoliciesController extends Controller
{
    public function cookies()
    {
        return $this->getPage(1, 'Política de Cookies');
    }

    public function privacy()
    {
        return $this->getPage(2, 'Política de Privacidade');
    }

    public function terms()
    {
        return $this->getPage(3, 'Termos de Uso');
    }

    public function getPage($type, $title)
    {
        $content = getSeoSimple($title, 'CMS UEEK');
        $policy = Policies::first();

        if (!$policy) {
            $policy = new Policies();
        }

        return Inertia::render('admin/policies/page', compact(['content', 'policy', 'type']))
            ->withViewData(['title' => $content->seoTitle, 'description' => $content->seoDescription]);
    }

    public function post(Request $request)
    {
        try {
            $policy = Policies::first();

            if (!$policy) {
                $policy = new Policies();
            }

            if ($request->type == 1) {
                $policy->cookies_title = $request->cookies_title;
                $policy->cookies_text = $request->cookies_text;
                $policy->cookies_seo_title = $request->cookies_seo_title;
                $policy->cookies_seo_description = $request->cookies_seo_description;

            } else if ($request->type == 2) {
                $policy->privacy_title = $request->privacy_title;
                $policy->privacy_text = $request->privacy_text;
                $policy->privacy_seo_title = $request->privacy_seo_title;
                $policy->privacy_seo_description = $request->privacy_seo_description;

            } else {
                $policy->terms_title = $request->terms_title;
                $policy->terms_text = $request->terms_text;
                $policy->terms_seo_title = $request->terms_seo_title;
                $policy->terms_seo_description = $request->terms_seo_description;
            }

            $policy->save();

            return response()->json([
                'title' => 'Concluído.',
                'message' => 'Conteúdo salvo com sucesso.',
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
