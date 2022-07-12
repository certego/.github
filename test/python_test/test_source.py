import unittest

try:
    from .source import A
except ImportError:
    from source import A


class TestA(unittest.TestCase):
    def test_mya(self):
        a = A()
        self.assertEqual(a.my_a(), 1)


class TestB(unittest.TestCase):
    def test_add_task(self):
        from python_test.celery import add

        rst = add.apply(args=(4, 4)).get()
        self.assertEqual(rst, 8)
