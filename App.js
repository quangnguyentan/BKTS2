import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
} from "react-native";
import styles from "./App.components.style";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const App = (FaBeer) => {
  const [list, setList] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");

  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [modalSearch, setModalSearch] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  useEffect(() => {
    getListEmployees();
  }, []);

  const getListEmployees = () => {
    fetch("https://server-react-native-brrx.onrender.com/api/employees", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) setList(res.products);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAddTask = (task) => {
    // add Task
    settaskList([...taskList, task]);
  };
  const handleDeleteTask = (id) => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn xóa", [
      {
        text: "Ok",
        onPress: () => {
          const url =
            "https://server-react-native-brrx.onrender.com/api/employees";
          fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              console.log(res);

              getListEmployees();
            })
            .catch((error) => {
              console.log(error);
            });
        },
      },
      { text: "cancel", onPress: () => {} },
    ]);
  };
  const handleCreate = () => {
    clearForm();
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
    setModalEdit(false);
  };

  const handleSave = () => {
    if (id === null) {
      fetch("https://server-react-native-brrx.onrender.com/api/employees", {
        method: "POST",
        body: JSON.stringify({
          name: name,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);

          getListEmployees();
          setModal(false);
          clearForm();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const url = "https://server-react-native-brrx.onrender.com/api/employees";
      fetch(`${url}/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: name,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);

          getListEmployees();
          setModalEdit(false);
          clearForm();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const clearForm = () => {
    setName("");

    setId(null);
  };
  const handleEdit = (item) => {
    setName(item.name);

    setId(item._id);
    setModalEdit(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={10}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Modal visible={modal}>
            <View style={styles.container}>
              <View style={styles.body}>
                <TouchableOpacity
                  onPress={handleClose}
                  style={[styles.header, styles.iconCss]}
                >
                  <Text style={css.first}>
                    <Ionicons name="exit-outline" size={36} color="black" />
                  </Text>
                </TouchableOpacity>
                <View>
                  <Text style={styles.header}>Tạo ghi chú</Text>
                </View>
                <Text style={css.overview}>Nội dung ghi chú</Text>
                <TextInput
                  multiline={true}
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                  }}
                  style={css.TextInput}
                />

                <TouchableOpacity onPress={handleSave} style={styles.header}>
                  <Text style={[css.center, css.khongbietnua]}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Modal visible={modalEdit}>
            <View style={styles.container}>
              <View style={styles.body}>
                <TouchableOpacity
                  onPress={handleClose}
                  style={[styles.header, styles.iconCss]}
                >
                  <Text style={css.first}>
                    <Ionicons name="exit-outline" size={36} color="black" />
                  </Text>
                </TouchableOpacity>
                <View>
                  <Text style={styles.header}>Sửa ghi chú</Text>
                </View>
                <Text style={css.overview}>Nội dung ghi chú</Text>
                <TextInput
                  multiline={true}
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                  }}
                  style={css.TextInput}
                />

                <TouchableOpacity onPress={handleSave} style={styles.header}>
                  <Text style={[css.center, css.khongbietnua]}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
        <Text style={styles.header}>Ứng dụng Ghi chú</Text>

        <Text style={[css.listEmployee, styles.colorPrimary]}>
          Danh sách Ghi chú
        </Text>

        <ScrollView style={styles.items}>
          {list?.map((item) => {
            return (
              <View style={css.rowBetween}>
                <View key={item._id} style={css.name}>
                  <Text>{item.name}</Text>
                </View>

                <View style={css.center}>
                  <TouchableOpacity onPress={() => handleDeleteTask(item._id)}>
                    <Text style={css.delete}>Xóa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleEdit(item)}>
                    <Text style={css.edit}>Sửa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity onPress={handleCreate} style={styles.header}>
          <Text style={[css.center, css.khongbietnua]}>Tạo ghi chú</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default App;
const css = StyleSheet.create({
  overview: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },

  center: {
    display: "flex",
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  khongbietnua: {
    backgroundColor: "#3a86ff",
    color: "white",
    marginBottom: 60,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  listEmployee: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    fontSize: 20,
    marginTop: 15,
    fontWeight: "bold",
  },
  listEmployeeSize: {
    fontSize: 15,
    fontWeight: "600",
  },
  listEmployeeSize1: {
    fontWeight: "normal",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  delete: {
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#e63946",
    borderRadius: 5,
  },
  edit: {
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#3a86ff",
    borderRadius: 5,
  },
  name: {
    width: 180,
  },
  TextInputa: {
    height: 44,
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#21a3d0",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#080357",
    marginTop: 30,
  },
  TextInput: {
    height: 250,
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#21a3d0",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#888",
    marginTop: 10,
    textAlignVertical: "top",
  },
});
