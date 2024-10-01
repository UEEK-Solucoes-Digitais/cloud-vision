<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ContactInfoController extends Controller
{
    public function index()
    {
        $content = getSeoSimple("Informações de contato", 'CMS UEEK');
        $contactInfo = ContactInfo::first();

        if (!$contactInfo) {
            $contactInfo = new ContactInfo();
            $contactInfo->save();
        }

        return Inertia::render('admin/contact_info/page', compact(['content', 'contactInfo']))
            ->withViewData(['title' => $content->seoTitle, 'description' => $content->seoDescription]);
    }

    public function post(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Erro de validação.',
                    'errors' => $validator->errors()
                ], 422);
            }

            $contactInfo = ContactInfo::first();

            if (!$contactInfo) {
                $contactInfo = new ContactInfo();
            }

            $contactInfo->facebook = $request->facebook;
            $contactInfo->instagram = $request->instagram;
            $contactInfo->youtube = $request->youtube;
            $contactInfo->email = $request->email;
            $contactInfo->phone = $request->phone;
            $contactInfo->whatsapp = $request->whatsapp;
      
            $contactInfo->save();

            return response()->json([
                'title' => 'Concluído.',
                'message' => 'Informações de contato salvas com sucesso.',
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
