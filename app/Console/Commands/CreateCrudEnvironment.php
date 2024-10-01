<?php

namespace App\Console\Commands;

use ControllerOperations;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use MigrationOperations;
use ModelOperations;
use ViewOperations;

class CreateCrudEnvironment extends Command
{
    protected $signature = 'make:crud';

    protected $description = 'Este comando irá criar um model, controller, migration e views';

    public function handle()
    {
        $class_name = $this->ask('Insira o nome da classe (ex: Client)');
        $migration_name = $this->ask('Insira o nome da tabela (ex: clients)');
        $instance_name_views = $this->ask('Insira o nome da instância para utilizar nas views. (ex: Clientes)');

        $controller_folder = "Admin";

        $columns = $this->ask('Insira as colunas da tabela separadas por vírgula. (exceto id, created_at, updated_at)');
        $instance_name = explode(",", $this->ask('Insira o nome da instância, primeiro em plural e depois em singular. (ex: clients, client)'));

        MigrationOperations::createMigration($migration_name, $columns, $class_name);
        ModelOperations::createModel($class_name, $migration_name);
        ControllerOperations::createController($controller_folder, $class_name, $instance_name, $columns, $instance_name_views);
        ViewOperations::createViews($instance_name, $instance_name_views, $columns, $class_name);
    }
}
