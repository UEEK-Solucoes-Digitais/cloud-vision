<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Mail\LeadEmail;
use App\Models\BlogPublication;
use App\Models\ContactInfo;
use App\Models\ContactLead;
use App\Models\JobVacancy;
use App\Models\PageBlog;
use App\Models\PageHome;
use App\Models\PageHomeBussiness;
use App\Models\PageHomeEntity;
use App\Models\PageHomeFeedback;
use App\Models\PageHomeQuestion;
use App\Models\Plan;
use App\Models\Policies;
use App\Models\Service;
use Google\Cloud\Vision\V1\ImageAnnotatorClient;
use Google\Cloud\Vision\V1\Feature\Type;
use Google\Cloud\Vision\V1\Likelihood;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class SiteController extends Controller
{

    public function home()
    {

        return Inertia::render('site/home/page');
    }

    public function policies()
    {
        $content = Policies::first();

        if (request()->routeIs('site.cookies')) {
            return Inertia::render('site/cookies/page', compact(['content']))->withViewData([
                'title' => $content->cookies_seo_title,
                'description' => $content->cookies_seo_description
            ]);
        }

        if (request()->routeIs('site.privacy')) {
            return Inertia::render('site/privacy/page', compact(['content']))->withViewData([
                'title' => $content->privacy_seo_title,
                'description' => $content->privacy_seo_description
            ]);
        }

        if (request()->routeIs('site.terms')) {
            return Inertia::render('site/terms/page', compact(['content']))->withViewData([
                'title' => $content->terms_seo_title,
                'description' => $content->terms_seo_description
            ]);
        }
    }

    public function imageTest(Request $request)
    {


        // $client = new ImageAnnotatorClient([
        //     'credentials' => base_path('config/cloud/google-vision.json')
        // ]);

        // // Análise da imagem
        // $response = $client->labelDetection($imageContent);
        // $labels = $response->getLabelAnnotations();

        // $results = [];
        // foreach ($labels as $label) {
        //     $results[] = $label->getDescription();
        // }

        // // Fechar o cliente para liberar os recursos
        // $client->close();

        // Armazenamento da imagem
        $image = UploadFile($request->file('file'), '/uploads/test');

        $image_path = public_path() . "/uploads/test/" . $image;

        $path_python = base_path('python/app.py');
        $imagenet_path = base_path('python/imagenet_classes.json');

        dd("py {$path_python} " . escapeshellarg($image_path) . " " . escapeshellarg($imagenet_path));
        // Executar o script Python e capturar a saída
        $output = shell_exec("py {$path_python} " . escapeshellarg($image_path) . " " . escapeshellarg($imagenet_path));
        // dd($output);

        // Transformar a saída em um array PHP
        $results = json_decode($output, true);

        // o results tem um predictions, que é a classificação da imagem, e um dominant_colors, que é a cor dominante da imagem
        // fazer uma busca no google images com a classificação da imagem

        $query = "";

        if (isset($results['predictions']) && count($results['predictions']) > 0) {
            $query .= $results['predictions'][0];
        }

        if (isset($results['dominant_colors']) && count($results['dominant_colors']) > 0) {
            // a posição 0 é uma array com 3 cores rgb, gerar uma string para a cor, como red, blue, green, etc
            $query .= " rgb_color=" . join(",", $results['dominant_colors'][0]);
        }

        dd($query);
    }
}
