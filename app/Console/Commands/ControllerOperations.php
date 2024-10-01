<?php

class ControllerOperations
{
    public static function createController($controller_folder, $class_name, $instance_name, $columns, $instance_name_views)
    {

        // Verificando se a pasta que o controller vai ser armazenado já existe
        // Caso não exista, a pasta é criada utilizando a função mkdir()
        $path = base_path() . DIRECTORY_SEPARATOR . "app" . DIRECTORY_SEPARATOR . "Http" . DIRECTORY_SEPARATOR . "Controllers" . DIRECTORY_SEPARATOR . $controller_folder;

        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }

        $file_path = $path . DIRECTORY_SEPARATOR . "{$class_name}Controller.php";

        if (file_exists($file_path)) {
            unlink($file_path);
        }

        // Criamos o arquivo com a permissão de write
        $controller_file = fopen($file_path, "w");

        $index_function = "";
        $read_function = '$' . trim($instance_name[0]) . ' = ' . $class_name . '::first();';
        $variables = "";
        $variables_page = "";
        $position_function = "";
        $status_function = "";

        $form_content = '
        $' . trim($instance_name[1]) . ' = null;

        if ($id) {
            $' . trim($instance_name[1]) . ' = ' . $class_name . '::where("status", 1)->find($id);
        }
        ';
        $is_crud = false;

        $plural = trim($instance_name[0]);
        $singular = trim($instance_name[1]);

        foreach (explode(",", $columns) as $column) {
            $column = trim($column);

            if ($column != 'position' && $column != 'status') {
                $variables_page .=  '"' . $column . '" => "",' . PHP_EOL;
            }

            switch (true) {
                case stripos($column, "image") !== false && stripos($column, "Webp") === false:
                    $variables .= self::getImageVariables($column, $singular, $plural);
                    break;
                case stripos($column, "icon") !== false:
                    $variables .= self::getIconVariables($column, $singular);
                    $read_function = '$' . trim($singular) . ' = ' . $class_name . '::where("status", 1)->orderBy("id", "desc")->get();';
                    break;
                case stripos($column, "position") !== false:
                    $read_function = '$' . trim($plural) . ' = ' . $class_name . '::where("status", 1)->orderBy("position", "asc")->get();';
                    $position_function = self::getPositionFunction($class_name);
                    $is_crud = true;
                    break;
                case stripos($column, "status") !== false:
                    $read_function = '$' . trim($plural) . ' = ' . $class_name . '::where("status", 1)->get();';

                    $index_function = self::getIndexFunction($instance_name_views, $plural, $read_function);
                    $status_function = self::getStatusFunction($class_name, $singular);
                    $is_crud = true;
                    break;
                default:
                    if (stripos($column, "Webp") === false) {
                        $variables .=  '$' . trim($singular) . '->' . $column . ' = $request->' . $column . ' ?? "";' . PHP_EOL;
                    }
                    break;
            }
        }

        if (!$is_crud) {
            $form_content = '
                $' . trim($instance_name[1]) . ' = ' . $class_name . '::first();

                if(!$' . trim($instance_name[1]) . '){
                    $' . trim($instance_name[1]) . ' = ' . $class_name . '::create([
                        ' . $variables_page . '
                    ]);
                }
            ';
        }

        $text =
            '<?php
            namespace App\Http\Controllers\Admin;

            use App\Models\\' . $class_name . ';

            use App\Http\Controllers\Controller;
            use Illuminate\Http\Request;
            use Inertia\Inertia;

            class ' . $class_name . 'Controller extends Controller
            {
                ' . $index_function . '

                public function form($id = null){
                    $content = getSeoSimple("Formulário ' . $instance_name_views . '", "CMS UEEK");
                   ' . $form_content . '

                    return Inertia::render("admin/' . trim($instance_name[0]) . '/form/page", compact(["content", "' . trim($instance_name[1]) . '"]))
                        ->withViewData(["title" => $content->seoTitle, "description" => $content->seoDescription]);
                }

                public function formRequest(Request $request){
                    try{
                        $' . trim($instance_name[1]) . ' = new ' . $class_name . '();

                        if($request->id){
                            $' . trim($instance_name[1]) . ' = ' . $class_name . ($is_crud ? '::where("status", 1)->find($request->id)' : '::first()') . ';

                            if(!$' . trim($instance_name[1]) . '){
                                return response()->json([
                                    "status" => 0,
                                    "title"=> "Erro",
                                    "type"=>"alert",
                                    "message" => "Item não encontrado",
                                ], 200);
                                exit;
                            }
                        }

                        ' . $variables . '
                        $' . trim($instance_name[1]) . '->save();

                        return response()->json([
                            "status" => 1,
                            "title"=>"Sucesso",
                            "message" => "Registro salvo com sucesso.",
                            "type" => "success"
                        ], 200);
                    } catch (\Throwable $e) {
                        return response()->json([
                            "status" => 0,
                            "title"=> "Erro",
                            "type"=>"alert",
                            "message" => "Ocorreu um erro ao salvar o registro. Tente novamente mais tarde.",
                            "error" => $e->getMessage(),
                        ], 200);
                    }
                }

                ' . $position_function . '
                ' . $status_function . '
            }
        ';

        fwrite($controller_file, $text);
    }

    public static function getImageVariables($name, $instance_name, $plural_name)
    {
        return
            '
        if ($request->hasFile("' . $name . '") && $request->file("' . $name . '")->isValid()) {
            list($' . trim($instance_name) . '->' . $name . ', $' . trim($instance_name) . '->' . $name . 'Webp) = UploadImageWithWebp($request->' . $name . ', "assets/images/uploads/' . trim($plural_name) . '");
        }
                            ';
    }

    public static function getIconVariables($name, $instance_name)
    {
        return
            '
        if ($request->hasFile("' . $name . '") && $request->file("' . $name . '")->isValid()) {
            if($request->' . $name . '->extension() === "svg"){
                $' . trim($instance_name) . '->' . $name . ' = UploadFile($request->' . $name . ', "assets/images/uploads/' . trim($instance_name) . '/");
            }else{
                return response()->json([
                    "status" => 0,
                    "title"=> "Erro",
                    "type"=>"alert",
                    "message" => "Insira apenas SVG para o ícone.",
                ], 200);
                exit;
            }
        }';
    }

    public static function getPositionFunction($class_name)
    {
        return
            '
        public function organize' . $class_name . '(Request $request)
        {
            $new_position = 0;

            foreach ($request->item as $id) {
                ' . $class_name . '::findOrFail($id)->update(["position" => $new_position]);
                $new_position++;
            }
        }
        ';
    }

    public static function getIndexFunction($instance_name_views, $instance_name, $read_function)
    {
        return
            '
            public function index(){
                $content = getSeoSimple("' . $instance_name_views . '", "CMS UEEK");
                ' . $read_function . '

                return Inertia::render("admin/' . trim($instance_name) . '/page", compact(["content", "' . trim($instance_name) . '"]))
                        ->withViewData(["title" => $content->seoTitle, "description" => $content->seoDescription]);
            }
        ';
    }

    public static function getStatusFunction($class_name, $singular_name)
    {
        return
            '
            public function remove(Request $request)
            {
            try {
                $' . $singular_name . 'Ids = $request->all();

                ' . $class_name . '::whereIn("id", $' . $singular_name . 'Ids)->where("status", 1)->update(["status" => 0]);

                return response()->json([
                    "status" => 1,
                    "title" => "Concluído.",
                    "message" => "Registro(s) removido(s) com sucesso.",
                    "type" => "success"
                ], 200);
            } catch (\Throwable $e) {
                return response()->json([
                    "title" => "Ocorreu um erro.",
                    "message" => "Ocorreu um erro ao realizar a operação. Tente novamente mais tarde.",
                    "type" => "alert",
                    "error" => $e->getMessage(),
                ], 500);
            }
        }

        public function copy(Request $request)
        {
            try {
                foreach ($request->inputs as $id) {
                    $instance = ' . $class_name . '::find($id);

                    $new_instance = $instance->replicate();
                    $new_instance->created_at = date("Y-m-d H:i:s");
                    $new_instance->updated_at = date("Y-m-d H:i:s");
                    $new_instance->save();
                }

                return response()->json([
                    "status" => 1,
                    "type" => "success",
                    "title"=>"Sucesso",
                    "message"    => "Duplicados com sucesso.",
                ], 200);
            } catch (\Throwable $e) {
                return response()->json([
                    "status" => 0,
                    "title"=> "Erro",
                    "type"=>"alert",
                    "message"    => "Ocorreu um erro ao duplicar. Tente novamente mais tarde.",
                    "error"    => $e->getMessage(),
                ], 500);
            }
        }';
    }
}
