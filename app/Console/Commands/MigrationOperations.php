<?php

class MigrationOperations
{
    public static function createMigration($migration_name, $columns, $class_name)
    {
        $file_name = date('Y_m_d') . '_' . date('H') . date('i') . date('s') . '_create_' . $migration_name . '_table.php';

        $file_path = base_path() . DIRECTORY_SEPARATOR . "database" . DIRECTORY_SEPARATOR . "migrations" . DIRECTORY_SEPARATOR . $file_name;

        if (file_exists($file_path)) {
            unlink($file_path);
        }

        $migration_file = fopen($file_path, "w");

        $column_types = '';
        $column_status = '';

        foreach (explode(",", $columns) as $column) {
            $column = trim($column);

            switch (true) {
                case (stripos($column, 'text') !== false || stripos($column, 'description') !== false) && stripos($column, 'btn') === false:
                    $column_types .= '
                    $table->text("' . $column . '");';
                    break;
                case stripos($column, 'position') !== false:
                    $column_types .= '
                    $table->integer("position")->default(999);';
                    break;
                case stripos($column, 'status') !== false:
                    $column_status .= '
                    $table->tinyInteger("status")->default(1);';
                    break;
                default:
                    $column_types .= '
                    $table->string("' . $column . '", 255);';
                    break;
            }
        }

        $text = '<?php

            use Illuminate\Database\Migrations\Migration;
            use Illuminate\Database\Schema\Blueprint;
            use Illuminate\Support\Facades\Schema;

            return new class extends Migration
            {
                public function up()
                {
                    Schema::create("' . $migration_name . '", function (Blueprint $table) {
                        $table->id();' . $column_types . '
                        $table->timestamps();
                        ' . $column_status . '
                    });
                }

                public function down()
                {
                    Schema::dropIfExists("' . $migration_name . '");
                }
            };
        ';

        fwrite($migration_file, $text);

        self::createTsModel($class_name, $columns);
    }

    public static function createTsModel($class_name, $columns)
    {
        $file_path_ts = base_path() . DIRECTORY_SEPARATOR . "resources" . DIRECTORY_SEPARATOR . "global" . DIRECTORY_SEPARATOR . "types" . DIRECTORY_SEPARATOR . "models" . DIRECTORY_SEPARATOR . "{$class_name}.ts";

        if (file_exists($file_path_ts)) {
            unlink($file_path_ts);
        }

        // Criamos o arquivo TS com a permissão de write
        $model_file_ts = fopen($file_path_ts, "w");

        $columns_string = '';

        foreach (explode(",", $columns) as $column) {
            $column = trim($column);

            $number_columns = ['position', 'status', 'type', 'price', 'value', 'position'];

            switch (true) {
                case in_array($column, $number_columns):
                    $columns_string .= '
                    ' . $column . ': number;';
                    break;
                default:
                    $columns_string .= '
                    ' . $column . ': string;';
                    break;
            }
        }

        $text = '
            export default interface I' . $class_name . ' {
                id: number;
                ' . $columns_string . '
                created_at: string;
                updated_at: string;
            }
        ';

        fwrite($model_file_ts, $text);
    }
}
