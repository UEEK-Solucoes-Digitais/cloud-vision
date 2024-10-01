<?php

class ModelOperations
{
    public static function createModel($class_name, $migration_name)
    {
        $file_path = base_path() . DIRECTORY_SEPARATOR . "app" . DIRECTORY_SEPARATOR . "Models" . DIRECTORY_SEPARATOR . "{$class_name}.php";

        if (file_exists($file_path)) {
            unlink($file_path);
        }

        // Criamos o arquivo com a permissão de write
        $model_file = fopen($file_path, "w");

        $text = '<?php

        namespace App\Models;

        use App\Models\BaseModel;

        class ' . $class_name . ' extends BaseModel
        {
            protected $table = "' . $migration_name . '";
        }
        ';

        fwrite($model_file, $text);
    }
}
