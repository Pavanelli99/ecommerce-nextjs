import { Button, Table, message } from "antd";
import { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import axios from "axios";
import moment from "moment";



function CategoriesList() {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);


  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.post('http:localhost:3000/category')
      setCategories(res.data)
    } catch (error: any) {
      message.error(error.message)

    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
    getCategories()
  }, [])

  const onDelete = async (id: String) => {
    try {
      setLoadingDelete(true);
      await axios.delete(`http://localhost:3000/category/${id}`);
      message.success('Category deleted successfully')
      setSelectedCategory(null);
      getCategories();
    } catch (error: any) { //criar exeptions
      message.error(error.message)

    } finally {
      setLoadingDelete(false);
    }



    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description"
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (createdAt: string) => moment(createdAt).format("dd/MM/yyyy")

      },
      {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (action: any, params: any) => (
            <div className="flex gap-5 items-center">
              <Button
                type="primary"
                className="btn-small mr-2a"
                onClick={() => {
                  setShowCategoryForm(true);
                  setSelectedCategory(params);
                }}
              >
                Edit
              </Button>

              <Button
                type="primary"
                danger
                className="btn-small"
                onClick={() => {
                  setSelectedCategory(params);
                  onDelete(params.id);
                }}
                loading={loadingDelete && selectedCategory?.id === params.id}
              >
                Delete
              </Button>
            </div>
          ),
        },
    ];


    return (
      <div>
        <div className="flex justify-end">
          <Button type="primary" onClick={() => { setShowCategoryForm(true) }}
          >Add Category</Button>
        </div>

        <div className="mt-5">
          <Table
            dataSource={categories}
            columns={columns}
            loading={loading}
            pagination={false}
          />
        </div>

        {showCategoryForm && (
          <CategoryForm showCategoryForm={showCategoryForm}
            setShowCategoryForm={setShowCategoryForm}
            reloadData={() => { getCategories }}
            category={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          ></CategoryForm>)}



      </div>


    );
  }
}

export default CategoriesList;