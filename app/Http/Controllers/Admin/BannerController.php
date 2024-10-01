<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function index()
    {
        $content = getSeoSimple("Banners", 'CMS UEEK');
        $banners = Banner::where('status', 1)->get();

        return Inertia::render('admin/banners/page', compact(['content', 'banners']))
            ->withViewData(['title' => $content->seoTitle, 'description' => $content->seoDescription]);
    }

    public function form($id = null)
    {
        $content = getSeoSimple("Formulário de banners", 'CMS UEEK');
        $banner = null;

        if ($id) {
            $banner = Banner::where('status', 1)->find($id);
        }

        return Inertia::render('admin/banners/form/page', compact(['content', 'banner']))
            ->withViewData(['title' => $content->seoTitle, 'description' => $content->seoDescription]);
    }


    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'image' => 'required|image',
            'image_mobile' => 'required|image',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'message' => 'Erro de validação.',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $banner = Banner::where('status', 1)->find($request->id);

            if (!$banner) {
                $banner = new Banner();
                $isUpdate = false;
            } else {
                $isUpdate = true;
            }

            if ($request->hasFile("image") && $request->file("image")->isValid()) {
                list($banner->image, $banner->image_webp) = UploadImageWithWebp($request->image, "assets/images/uploads/banners/");
            }

            if ($request->hasFile("image_mobile") && $request->file("image_mobile")->isValid()) {
                list($banner->image_mobile, $banner->image_mobile_webp) = UploadImageWithWebp($request->image_mobile, "assets/images/uploads/banners/");
            }

            $banner->title = $request->title;
            $banner->description = $request->description;
            $banner->btn_text = $request->btn_text;
            $banner->btn_link = $request->btn_link;

            $banner->position = -1;
            $banner->status = 1;
            $banner->save();

            return response()->json([
                'title' => 'Concluído.',
                'message' => 'Banner ' . ($isUpdate ? 'atualizado' : 'criado') . ' com sucesso.',
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
            $bannersIds = $request->all();

            Banner::whereIn('id', $bannersIds)->where('status', 1)->update(['status' => 0]);

            return response()->json([
                'title' => 'Concluído.',
                'message' => "Banner(s) removido(s) com sucesso.",
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
