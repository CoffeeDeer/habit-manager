class TodosController < ApplicationController
    def index
        @todos = Todo.order(updated_at: :desc)
        respond_to do |format|
            format.html # index.html.erb
            format.xml  { render xml: @todos }
            format.json { render json: @todos }
        end
    end
    
    def show
        todo = Todo.find(params[:id])
        render json: todo
    end
end