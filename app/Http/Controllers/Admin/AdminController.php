<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $content = getSeoSimple("Admins", 'CMS UEEK');
        $admins = Admin::where('status', 1)->get();

        return Inertia::render('admin/admin/page', compact(['content', 'admins']))
            ->withViewData(['title' => $content->seoTitle, 'description' => $content->seoDescription]);
    }

    public function form($id = null)
    {
        $content = getSeoSimple("Formulário de admin", 'CMS UEEK');
        $admin = null;

        if ($id) {
            $admin = Admin::where('status', 1)->find($id);
        }

        return Inertia::render('admin/admin/form/page', compact(['content', 'admin']))
            ->withViewData(['title' => $content->seoTitle, 'description' => $content->seoDescription]);
    }


    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:32',
            'email' => 'required|email|unique:admins,email,' . $request->id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'message' => 'Erro de validação.',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $admin = Admin::where('status', 1)->find($request->id);

            if (!$admin) {
                $admin = new Admin();
                $isUpdate = false;
            } else {
                $isUpdate = true;
            }

            $admin->name = $request->name;
            $admin->email = $request->email;

            if (!empty($request->password)) {
                $admin->password = Hash::make($request->password);
            }

            $admin->status = 1;
            $admin->save();

            return response()->json([
                'title' => 'Concluído.',
                'message' => 'Administrador ' . ($isUpdate ? 'atualizado' : 'criado') . ' com sucesso.',
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

    public function remove(Request $request)
    {
        try {
            $adminIds = $request->all();

            if (Admin::where('status', 1)->count() <= count($adminIds)) {
                return response()->json([
                    'title' => 'Ocorreu um erro.',
                    'message' => "Não é possível excluir todos os administradores ativos do sistema.",
                    'type' => 'alert'
                ], 401);
            }

            Admin::whereIn('id', $adminIds)->where('status', 1)->update(['status' => 0]);

            return response()->json([
                'title' => 'Concluído.',
                'message' => "Administrador(es) removido(s) com sucesso.",
                'type' => 'success'
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'title' => 'Ocorreu um erro.',
                'message' => "Ocorreu um erro ao realizar a operação. Tente novamente mais tarde.",
                'type' => 'alert',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
