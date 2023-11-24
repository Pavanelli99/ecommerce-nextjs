import { getAntdFieldsRequireRule } from "@/helpers/validations";
import { Form, Modal, message } from "antd";
import axios from "axios";

type CategoryFormData = {
  name: string;
  description: string;
}

function CategoryForm({
  showCategoryForm,
  setShowCategoryForm,
  reloadData,
  category,
  setSelectedCategory,
}: CategoryFormProps) {

  const [form] = Form.useForm()

  const onFinish = async (values: CategoryFormData) => {  // arrow function =>
    try {

      if (category) {
       await axios.put(`http://localhost:3000/category/${category.id}`, values);
       message.success('Category updated successfully');

      } else {

        const res = await axios.post('http://localhost:3000/category', values);
        message.success("Category added successfully");

      }

      reloadData();
      setShowCategoryForm(false);
      setSelectedCategory(null);

    } catch (error: any) {
      message.error(error.message)

    }

  }

  return (
    <Modal

      title={<h1 className="text-2xl font-bold" text-gray-800>
        {category ? "Edit Category" : "Add Category"} </h1>}
      open={showCategoryForm}
      onCancel={() => {
        setShowCategoryForm(false);
        setSelectedCategory(null);
      }}
      centered
      closable={false}
      okText="Save"
      onOk={() => {
        form.submit();
      }}
    >
      <Form
        layout="vertical"
        className="flex flex-col gap-5"
        form={form}
        onFinish={onFinish}
        initialValues={category}

      >
        <Form.Item
          label="Category Name"
          name="Name"
          rules={getAntdFieldsRequireRule("CategoryName is required!")}


        >
          <input type="text" />

        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={getAntdFieldsRequireRule("Description is required!")}

        >
          <textarea></textarea>

        </Form.Item>


      </Form>

    </Modal>
  )
}

export default CategoryForm

interface CategoryFormProps {
  showCategoryForm: boolean;
  setShowCategoryForm: (Show: boolean) => void;
  reloadData: () => void;
  category: any;
  setSelectedCategory: (category: any) => void;
}